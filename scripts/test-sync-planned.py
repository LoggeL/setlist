import datetime as dt
import importlib.util
import unittest
from pathlib import Path
spec = importlib.util.spec_from_file_location('sync', Path(__file__).with_name('sync-planned.py'))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)

class CompletionTests(unittest.TestCase):
    def test_only_registered_past_and_idempotent(self):
        data = {'want': [{'name': 'A'}, {'name': 'Untouched'}], 'seen': [], 'upcoming': [
            {'artist': 'a', 'date': '2026-11-06', 'city': 'Mannheim'},
            {'artist': 'Untouched', 'date': '2026-11-07'},
            {'artist': 'STUTYARD', 'kind': 'event', 'date': '2026-11-06'}]}
        out, changes = sync.complete(data, dt.date(2026, 11, 7))
        self.assertEqual(len(changes), 1)
        self.assertEqual([a['name'] for a in out['want']], ['Untouched'])
        self.assertEqual(len(out['upcoming']), 3)
        self.assertEqual(out['upcoming'][2]['completionKind'], 'event-only')
        self.assertEqual(sync.complete(out, dt.date(2026, 11, 7)), (out, []))
        self.assertEqual(data['seen'], [])

    def test_repeat_preserves_note_and_latest_first(self):
        data = {'want': [], 'seen': [{'name': 'A', 'note': 'Old festival 2024'}], 'upcoming': [
            {'artist': 'A', 'date': '2026-10-23', 'city': 'City'},
            {'artist': 'A', 'date': '2026-11-06', 'city': 'City'}]}
        out, _ = sync.complete(data, dt.date(2026, 11, 7))
        self.assertEqual(len(out['seen']), 1)
        self.assertTrue(out['seen'][0]['note'].startswith('City, 06.11.2026'))
        self.assertIn('Old festival 2024', out['seen'][0]['note'])
        self.assertEqual([a['date'] for a in out['seen'][0]['attendances']], ['2026-11-06', '2026-10-23'])

    def test_dst_calendar_boundary(self):
        from zoneinfo import ZoneInfo
        berlin = ZoneInfo('Europe/Berlin')
        for stamp, expected in [('2026-10-24T22:30:00+00:00', '2026-10-25'), ('2026-10-25T23:30:00+00:00', '2026-10-26')]:
            self.assertEqual(dt.datetime.fromisoformat(stamp).astimezone(berlin).date().isoformat(), expected)

if __name__ == '__main__':
    unittest.main()
