# Registered-concert completion

Only the explicit `upcoming` collection authorizes attendance completion. WANT is
never treated as a booking. After the concert's Europe/Berlin calendar day,
`sync-planned.py` moves known artists to SEEN, retains previous notes, records
separate repeat attendances, and retains completed plans with markers. Event
brands/unknown catalog names complete only the event, never create artists.

Production authoritative static catalog: `/home/logge/setlist-data/db/catalog/bands.json`,
served through the existing `/data` Dokploy bind mount. Repository `bands.json`
is the bootstrap snapshot, not a nightly git target. Future catalog edits must
update the authoritative catalog too; do not replace it with an older seed.
The older `/home/logge/setlist-data/bands.json` is legacy, not the served catalog.

`~/.config/systemd/user/setlist-planned.timer` runs at 00:05 Europe/Berlin with
Persistent=true; user linger is enabled. It invokes the stable installed script
`/home/logge/setlist-data/scripts/sync-planned.py` in Python's Docker image, with
host zoneinfo mounted, no network, a filesystem lock and atomic JSON publication.
SQLite uses a transaction and separate owner attendance rows, deduplicated by
artist/date. A failed publication can safely replay after a DB commit. Backups
of JSON and SQLite are created only for changing runs under `backups/planned-*`.
Existing unrelated user backups are never removed. Backups currently require
manual retention review (two small snapshots per changing run).

When updating the script, copy the reviewed version into the stable scripts
folder. Service commands: `systemctl --user start setlist-planned.service`,
`systemctl --user list-timers setlist-planned.timer`.

Checks: `python3 scripts/test-sync-planned.py`, `node scripts/test-upcoming.cjs`,
`node scripts/test-year-dividers.cjs`, `docker build .`.
