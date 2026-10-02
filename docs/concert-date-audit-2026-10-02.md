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

## Follow-up: earliest-candidate rule (2026-10-02)

User explicitly instructed: “Was auch immer früher war. Du kannst die Termine der festivals doch easy finden”. This supersedes the ambiguity blockers above: choose the earliest documented matching event, not a first-ever artist performance. Correct demonstrably erroneous imported labels where a documented appearance matches known festival attendance (RaR 2024/2026 and Southside 2026). The old audit is preserved as provenance, not the current assignment status. Public timetables still establish event dates, not independent proof of personal attendance.

21 notes updated; 49 SEEN entries and the entire wishlist, songs, images, previews and Moonkid remain unchanged. SQLite synchronization updates 18 existing rows and inserts 3 already-existing SEEN artists missing from SQLite (Against the Current, Madsen, Skindred); no new public artist cards. SQLite backup: `/home/logge/setlist-data/db/data.db.before-earliest-user-rule-20261002`.

| Artist | Selected calendar date | Event / evidence |
|---|---|---|
| Against the Current | 08.06.2024 | RaR, 14:35 [R24] |
| Betontod | 07.06.2024 | RaR, 16:40 [R24] |
| Donots | 08.06.2024 | RaR, 17:10 [R24]; Rocco year unspecified |
| Electric Callboy | 08.06.2024 | RaR, 18:40 [R24] |
| Kraftklub | 09.06.2024 | RaR, 20:15 [R24] |
| Madsen | 09.06.2024 | RaR, 16:50 [R24] |
| Pendulum | 08.06.2024 | RaR, 19:40 [R24] |
| Skindred | 07.06.2024 | RaR, 19:25 [R24] |
| Team Scheiße | 08.06.2024 | RaR, 21:50 [R24]; known RaR 2024 earlier than alternative festival editions |
| Berq | 20.06.2025 | Southside, 20:30 [S25] |
| Blond | 20.06.2025 | Southside, 16:15 [S25] |
| Ok.danke.tschüss | 19.06.2025 | Southside Thursday warm-up, 20:00 [S25] |
| Von wegen Lisbeth | 21.06.2025 | Southside, 18:30 [S25] |
| Zartmann | 22.06.2025 | Southside, 14:45 [S25] |
| SDP | 08.06.2025 | RaR Saturday programme at 01:00 Sunday [R25], earlier than Southside 21.06.2025; Rocco year unspecified |
| Don't Tell the Others | 08.03.2025 | Black & Orange Party, Ramsen [P25]; earlier of documented 2025/2026 parties |
| FiNCH | 07.06.2026 | RaR Sunday [R26], earlier than Southside 21.06.2026 [S26]; absent from claimed 2025 editions |
| Bosse | 20.06.2026 | Southside, 19:15 [S26]; absent from claimed 2025 editions |
| Kaffkiez | 21.06.2026 | Southside, 15:30 [S26]; absent from claimed 2025 editions |
| Drei Meter Feldweg | 21.06.2026 | Southside, 13:15 [S26]; absent from claimed 2025 edition |
| Provinz | 20.06.2026 | Southside Friday programme at 00:30 Saturday [S26]; absent from claimed 2025 editions; Rocco year unspecified |

Sources (read directly):

- [R24] https://rockamring.eifelvista.com/line-up-2024/ — reproduction of organizer timetable, attribution and update date included.
- [R25] https://rockamring.eifelvista.com/line-up-2025/ — organizer timetable reproduction.
- [R26] https://rockamring.eifelvista.com/line-up-2026/ — published day-by-day lineup (01.11.2025); FiNCH Sunday.
- [S25] https://southside.de/fileadmin/user_upload/Festivals/Southside/DOCs/Timetable/Timetable_Southside_A4_250514.pdf — official timetable.
- [S26] https://www.festivalhopper.de/festival/lineup/southside-festival-2026 — archived exact stage timetable, updated 20.06.2026. Official 2026 act/timetable pages now return 404; current official lineup is 2027. Archive.org returned no June 2026 snapshot for `/line-up/`. Do not misrepresent this secondary archived timetable as an official PDF.
- [P25] https://ol.wittich.de/titel/783/ausgabe/9/2025/artikel/00000000000046822359-OL-783-2025-9-9-0 — original documented party candidate; contrasting 2026 poster retained above.

8 genuinely unresolved assignments retained without fabrication:

- Bluthund, From Fall to Spring, Peter Fox, Tream, Yu: no matching exact performance in the referenced 2023/2025 timetables, RaR 2024/2026 or Southside 2026 checked. A festival span alone is insufficient.
- ENNIO: Southside Friday 21.06.2024 is documented [official 2024 PDF above], but Southside 2024 attendance is not established by the known edition history; Rocco edition unspecified. Earliest rule does not authorize arbitrary unrelated editions.
- Drunken Masters: Heidelberg/halle02 21.02.2026 remains an unconfirmed singleton attendance candidate. Southside 20.06.2026 is a different event from the user's specified Heidelberg concert.
- Mehnersmoos: Saarbrücken/Garage 06.09.2024 remains an unconfirmed singleton attendance candidate; no earlier/later confirmed attended candidate ambiguity exists. Future 28.11.2026 remains excluded.

Remaining unspecified Rocco dates do not override exact known festival dates; no arbitrary first-ever Rocco appearance selected. Previously resolved dates are unchanged.
