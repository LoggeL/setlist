from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
source = Path('/home/logge/.hermes/cache/images/img_281ad4ecb50d.jpg')
im = Image.open(source).convert('RGB')
# Preserve the original header, all historical rows and all supplied wordmarks.
# Two new text-only rows: no invented artist logos.
width, height = im.size
out = Image.new('RGB', (width, height + 160), im.getpixel((20, 1200)))
out.paste(im.crop((0, 0, width, 924)), (0, 0))
out.paste(im.crop((0, 924, width, height)), (0, 1084))
draw = ImageDraw.Draw(out)
navy = (5, 25, 62)
font = '/usr/share/fonts/liberation-sans-fonts/LiberationSans-Bold.ttf'
f = ImageFont.truetype(font, 27)
small = ImageFont.truetype(font, 21)
namefont = ImageFont.truetype(font, 30)
for top, date, name, city in [(924, '18.02.27', 'JUGO ÜRDENS', 'FRANKFURT'), (1004, '03.04.27', 'RAUM27', 'WIESBADEN')]:
    # Sample original paper background rather than painting a different palette.
    patch = im.crop((0, 1170, width, 1250))
    out.paste(patch, (0, top))
    draw.text((43, top + 23), date, font=f, fill=navy)
    draw.text((315, top + 39), name, font=namefont, fill=navy, anchor='mm')
    draw.text((464, top + 27), city, font=small, fill=navy)
    draw.rounded_rectangle((635, top + 19, 675, top + 61), radius=2, outline=navy, width=1)
    draw.line((43, top + 79, 677, top + 79), fill=(100, 112, 125), width=1)
# Reuse exact original blue checkbox pixels for newly completed concerts.
check = im.crop((633, 218, 678, 263))
out.paste(check, (633, 544))
out.paste(check, (633, 626))
target = Path('/home/logge/.hermes/workspace/setlist/live26-27-updated.png')
out.save(target)
print(target)
