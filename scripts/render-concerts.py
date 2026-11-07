#!/usr/bin/env python3
"""Render current Berlin-day-inclusive upcoming concerts from the live catalog."""
import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--today', default=datetime.now(ZoneInfo('Europe/Berlin')).date().isoformat())
parser.add_argument('--output', default=str(root / 'konzertreihe.png'))
args = parser.parse_args()
data = json.loads((root / 'bands.json').read_text())
events = sorted((e for e in data['upcoming'] if e['date'] >= args.today), key=lambda e: e['date'])
assert len({(e['date'], e['artist'].casefold(), e['city']) for e in events}) == len(events)
font_path = '/usr/share/fonts/google-noto-vf/NotoSans[wght].ttf'
def font(size):
    return ImageFont.truetype(font_path, size)

bg, fg, muted, pink, green = '#0e0e11', '#f0edf1', '#acaaae', '#ff8aa9', '#2ff801'
years = sorted({e['date'][:4] for e in events})
height = 370 + len(events) * 174 + len(years) * 92
image = Image.new('RGB', (1080, height), bg)
draw = ImageDraw.Draw(image)
draw.rectangle((64, 56, 160, 65), fill=green)
draw.text((64, 91), 'KONZERTREIHE', font=font(76), fill=fg)
draw.text((68, 195), 'DIE NÄCHSTEN LIVE-MOMENTE', font=font(27), fill=pink)
y = 285
for year in years:
    draw.text((65, y), year, font=font(52), fill=green)
    draw.line((236, y + 45, 1014, y + 45), fill='#48474b', width=2)
    y += 92
    for event in [e for e in events if e['date'].startswith(year)]:
        date = '.'.join(reversed(event['date'][5:].split('-'))) + '.'
        draw.text((65, y + 12), date, font=font(40), fill=pink)
        title_font = font(48)
        while draw.textlength(event['artist'], font=title_font) > 748:
            title_font = font(title_font.size - 1)
        draw.text((257, y), event['artist'], font=title_font, fill=fg)
        details = ' · '.join(filter(None, [event['city'], event.get('venue')]))
        assert draw.textlength(details, font=font(30)) <= 748
        draw.text((260, y + 71), details, font=font(30), fill=muted)
        draw.line((65, y + 148, 1014, y + 148), fill='#25252a', width=2)
        y += 174
assert y + 70 < height
footer = f"{len(events)} TERMINE  /  STAND {'.'.join(reversed(args.today.split('-')))}"
draw.text((65, height - 77), footer, font=font(24), fill=muted)
draw.text((760, height - 77), 'bands.logge.top', font=font(24), fill=pink)
image.save(args.output)
print(json.dumps({'output': args.output, 'size': image.size, 'count': len(events), 'events': events}, ensure_ascii=False, indent=2))
