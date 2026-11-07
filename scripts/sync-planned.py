#!/usr/bin/env python3
"""Complete explicitly registered plans after their Europe/Berlin calendar day.
Persistent catalog is authoritative; seed only bootstraps it. No WANT inference.
"""
import argparse
import copy
import datetime as dt
import fcntl
import json
import os
from pathlib import Path
import sqlite3
from zoneinfo import ZoneInfo


def complete(data, today):
    result = copy.deepcopy(data)
    changes = []
    for event in sorted(result.get('upcoming', []), key=lambda e: e['date']):
        date = dt.date.fromisoformat(event['date'])
        if date >= today or event.get('completed'):
            continue
        name = event['artist'].casefold()
        artist = next((a for section in ('seen', 'want') for a in result[section]
                       if a['name'].casefold() == name), None)
        event['completed'] = True
        event['completedOn'] = today.isoformat()
        if artist is None or event.get('kind') == 'event':
            event['completionKind'] = 'event-only'
            continue
        result['want'] = [a for a in result['want'] if a['name'].casefold() != name]
        if not any(a['name'].casefold() == name for a in result['seen']):
            result['seen'].append(artist)
        attendance = {k: event[k] for k in ('date', 'city', 'venue') if event.get(k)}
        records = artist.setdefault('attendances', [])
        if attendance not in records:
            records.append(attendance)
        records.sort(key=lambda a: a['date'], reverse=True)
        label = ', '.join(filter(None, [event.get('city'), event.get('venue'), date.strftime('%d.%m.%Y')]))
        old = artist.get('note', '')
        if label not in old:
            artist['note'] = label + (' · ' + old if old else '')
        changes.append((event, artist))
    return result, changes


def atomic(path, data):
    temporary = path.with_suffix('.tmp')
    with temporary.open('w') as stream:
        json.dump(data, stream, ensure_ascii=False, indent=2)
        stream.write('\n')
        stream.flush()
        os.fsync(stream.fileno())
    os.replace(temporary, path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--state', type=Path, required=True)
    parser.add_argument('--seed', type=Path, required=True)
    args = parser.parse_args()
    catalog = args.state / 'db/catalog/bands.json'
    catalog.parent.mkdir(parents=True, exist_ok=True)
    with (catalog.parent / '.sync.lock').open('w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        data = json.loads((catalog if catalog.exists() else args.seed).read_text())
        today = dt.datetime.now(ZoneInfo('Europe/Berlin')).date()
        updated, changes = complete(data, today)
        db = sqlite3.connect(args.state / 'db/data.db')
        # Back up once per changing run; SQLite backup includes committed WAL data.
        if changes:
            backup = args.state / 'backups' / ('planned-' + dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%S%f') + '.sqlite')
            backup.parent.mkdir(exist_ok=True)
            with sqlite3.connect(backup) as target:
                db.backup(target)
            atomic(backup.with_suffix('.json'), data)
        with db:
            user = db.execute('SELECT id FROM users WHERE username=?', ('logge',)).fetchone()
            if not user:
                raise RuntimeError('Owner logge missing; refusing mutation')
            for event, artist in changes:
                exists = db.execute("SELECT 1 FROM live_events WHERE user_id=? AND lower(artist_name)=lower(?) AND event_date=? AND coalesce(venue,'')=? AND coalesce(note,'')=?", (user[0], artist['name'], event['date'], event.get('venue', ''), event.get('city', ''))).fetchone()
                if not exists:
                    db.execute('INSERT INTO live_events(user_id,artist_name,artist_img,genre,venue,event_date,note,track_title,preview_url) VALUES(?,?,?,?,?,?,?,?,?)', (user[0], artist['name'], artist.get('img'), artist.get('genre'), event.get('venue'), event['date'], event.get('city'), artist.get('trackTitle'), artist.get('preview')))
                db.execute('DELETE FROM wishlist WHERE user_id=? AND lower(artist_name)=lower(?)', (user[0], artist['name']))
        if updated != data or not catalog.exists():
            atomic(catalog, updated)
        print(json.dumps({'day': str(today), 'completed': len(changes), 'want': len(updated['want']), 'seen': len(updated['seen']), 'planned': len(updated.get('upcoming', []))}))


if __name__ == '__main__':
    main()
