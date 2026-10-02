# Concert date audit — 2026-10-02

Audited all 36 SEEN entries lacking an exact date at task start (49 SEEN total). Applied 7 date corrections and 2 user-confirmed venue/city corrections; 29 date assignments remain unresolved. Public lineups establish concert dates, not personal attendance. No festival year was silently changed. Existing dated entries, track choices, previews and wishlist preserved.

## Live source verification

Traefik bands.logge.top routers target bands-dokploy-ilgt2c-service-118. Running container serves nginx static root /usr/share/nginx/html, port 3000. Public rendered HTML fetches bands.json; exact public JSON matches container JSON and seed. Mounted /data SQLite exists but is NOT the read source of this rendered static page. DB corrections are scoped synchronization for the retained app data, not proof of live rendering.

## Moonkid cover

Retained wishlist #97 and live LIEBE card already use the same image as removed #28 in the before-dedup backup:

https://cdn-images.dzcdn.net/images/artist/4284d7479fea6b1a05a30ab30e6aca20/250x250-000000-80-0-0.jpg

Before = after (no-op, not a fabricated visual change). Retain LIEBE and previews/Moonkid-Liebe.mp3?v=1789686000. DB #28 and #97 had no distinct album_cover_url. Interrupted Moonkid child transcript contained inspections and scratch copies, no completed production cover write.

## Evidence and decisions — every initially undated entry

### Against the Current — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 08.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### Berq — unresolved

Original note: Rock am Ring / Southside, 2025

Southside 20.06.2025 is documented. Existing slash-separated Rock am Ring / Southside note does not establish the attended edition; candidate kept in audit, not assigned as attendance.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Betontod — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 07.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### Blond — unresolved

Original note: Rock am Ring / Southside, 2025

Southside 20.06.2025 is documented. Existing slash-separated Rock am Ring / Southside note does not establish the attended edition; candidate kept in audit, not assigned as attendance.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Bluthund — unresolved

Original note: Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Bosse — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Bring me the Horizon — applied

Original note: Rock am Ring, 2023

Rock am Ring · 05.06.2023 (00:00; Festival-Sonntag 04.06.)

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html

### Don't Tell the Others — unresolved

Original note: (empty)

Same named party and band documented on both 08.03.2025 and 07.03.2026. User confirmed party/venue, not year. Venue applied; no date inferred.

- https://ol.wittich.de/titel/783/ausgabe/9/2025/artikel/00000000000046822359-OL-783-2025-9-9-0
- https://www.kolping-ramsen.de/images/WhatsApp_Image_2026-02-20_at_09.39.50.jpeg

### Donots — unresolved

Original note: Rock am Ring, 2023 + Rocco del Schlacko

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 08.06.2024 found in 2024 timetable; not substituted for the stated 2023. Rocco edition/year unspecified.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/
- https://www.rocco-del-schlacko.de/history-2/

### Drei Meter Feldweg — unresolved

Original note: Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Drunken Masters — unresolved

Original note: Heidelberg

City only, no year. Candidate halle02 21.02.2026 is documented, but attendance at that edition is not established.

- https://heidelberg-aktuell.de/event/drunken-masters/
- https://www.bandsintown.com/e/107159875-drunken-masters-at-halle02

### Electric Callboy — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 08.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### ENNIO — unresolved

Original note: Rock am Ring / Southside, 2025 + Rocco del Schlacko

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed. Rocco edition/year unspecified. Artist appears in Southside 2024 Friday programme, not the claimed 2025.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/
- https://www.rocco-del-schlacko.de/history-2/
- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_2024.pdf

### Feine Sahne Fischfilet — applied

Original note: Highfield, 2026

Highfield · 16.08.2026

- https://highfield.de/en/line-up-2026/act/feine-sahne-fischfilet/

### FiNCH — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### From Fall to Spring — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/

### Hollywood Undead — applied

Original note: Rock am Ring, 2023

Rock am Ring · 03.06.2023

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html

### Kaffkiez — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Kraftklub — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 09.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### Lumpenpack — applied

Original note: Highfield, 2026

Highfield · 15.08.2026

- https://highfield.de/en/line-up-2026/act/das-lumpenpack/

### Madsen — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 09.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### Mehnersmoos — unresolved

Original note: (empty)

User confirmed SAARBRÜCKEN only. Past Garage concert 06.09.2024 documented; future Saarlandhalle 28.11.2026 is not a SEEN date. Year/venue of attended concert unconfirmed. City applied.

- https://www.saarevent.com/event/mehnersmoos/
- https://www.saarevent.com/event/mehnersmoos-2/

### Ok.danke.tschüss — unresolved

Original note: Rock am Ring / Southside, 2025

Southside warm-up 19.06.2025 is documented. Existing slash-separated Rock am Ring / Southside note does not establish the attended edition; candidate kept in audit, not assigned as attendance.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Pendulum — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 08.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### Peter Fox — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Provinz — unresolved

Original note: Rock am Ring / Southside, 2025 + Rocco del Schlacko

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed. Rocco edition/year unspecified.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/
- https://www.rocco-del-schlacko.de/history-2/

### Querbeat — applied

Original note: Southside, 2025

Southside · 21.06.2025

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf

### SDP — unresolved

Original note: Rock am Ring / Southside, 2025 + Rocco del Schlacko

Multiple matching 2025 concerts: Rock am Ring Saturday late-night 01:00 (calendar 08.06.2025); Southside Friday late-night 00:30 (calendar 21.06.2025). Rocco year also missing. Cannot choose or assert attendance at both.

- https://rockamring.eifelvista.com/line-up-2025/
- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://www.rocco-del-schlacko.de/history-2/

### Skindred — unresolved

Original note: Rock am Ring, 2023

Not listed in the complete Rock am Ring 2023 timetable. Existing year/venue needs confirmation. Candidate Rock am Ring 07.06.2024 found in 2024 timetable; not substituted for the stated 2023.

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html
- https://clashfinder.com/m/rar2023/
- https://rockamring.eifelvista.com/line-up-2024/

### Swiss & Die Andern — applied

Original note: Southside, 2025

Southside · 22.06.2025

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf

### Team Scheiße — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed. Candidate Rock am Ring 08.06.2024, not 2025.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/
- https://rockamring.eifelvista.com/line-up-2024/

### Three Days Grace — applied

Original note: Rock am Ring, 2023

Rock am Ring · 04.06.2023

- https://www.blick-aktuell.de/Adenau/Das-ist-der-Spielplan-von-Rock-am-Ring-2023-553650.html

### Tream — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Von wegen Lisbeth — unresolved

Original note: Rock am Ring / Southside, 2025

Southside 21.06.2025 is documented. Existing slash-separated Rock am Ring / Southside note does not establish the attended edition; candidate kept in audit, not assigned as attendance.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Yu — unresolved

Original note: Rock am Ring / Southside, 2025

Not listed in the claimed Southside 2025 timetable or Rock am Ring 2025 timetable (where named). Year/venue needs confirmation; no replacement year guessed.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

### Zartmann — unresolved

Original note: Rock am Ring / Southside, 2025

Southside 22.06.2025 is documented. Existing slash-separated Rock am Ring / Southside note does not establish the attended edition; candidate kept in audit, not assigned as attendance.

- https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf
- https://rockamring.eifelvista.com/line-up-2025/

## Local history and limitations

Searched current files and all git history in /home/logge/Projects/next-theater for Black/Orange party and Don’t Tell the Others: no matching party-date record found. Bands history 1247651 introduced many broad festival/year notes in one calendar-import change; several disagree with published lineups. SQLite live_events rows dated 2026-04-18 were bulk-import placeholders created within minutes, NOT usable concert evidence. No DB created_at date was treated as attendance.

Bring Me The Horizon is listed under festival Sunday 04.06.2023 at 00:00–01:30: the applied calendar date is 05.06.2023, and the note retains the Sunday convention explicitly.

Primary search/extract backend returned 403; Google browser was challenged; DuckDuckGo POST worked for initial searches then rate/challenge blocked further queries. Direct archived timetables and primary event pages were successfully read. Negative timetable matches mean a year/venue mismatch requiring confirmation, not a claim the artist never performed elsewhere.
