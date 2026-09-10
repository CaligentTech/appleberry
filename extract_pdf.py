from PIL import Image
from collections import Counter
import sys
sys.stdout.reconfigure(encoding='utf-8')

img = Image.open("logo for Social media latest.png").convert("RGB")
pixels = list(img.getdata())

# Filter out white/near-white and black/near-black pixels
colored_pixels = []
for r, g, b in pixels:
    if r > 240 and g > 240 and b > 240:
        continue
    if r < 15 and g < 15 and b < 15:
        continue
    if abs(r - g) < 10 and abs(g - b) < 10 and r > 200:
        continue
    colored_pixels.append((r, g, b))

def quantize(color, step=5):
    return tuple((c // step) * step for c in color)

quantized = [quantize(p) for p in colored_pixels]
counter = Counter(quantized)

print(f"Total colored pixels analyzed: {len(colored_pixels)}")
print(f"\nTop 20 dominant colors (RGB -> HEX):")
print("-" * 60)
for (r, g, b), count in counter.most_common(20):
    hex_color = f"#{r:02X}{g:02X}{b:02X}"
    pct = (count / len(colored_pixels)) * 100
    print(f"  RGB({r:3d}, {g:3d}, {b:3d})  ->  {hex_color}  ({pct:5.1f}% - {count} px)")

# Group into color families
print(f"\n\nColor Family Analysis:")
print("-" * 60)
purple_count = 0
dark_count = 0
gray_count = 0
other_count = 0

for (r, g, b), count in counter.items():
    if b > r and b > g and (r > 50 or b > 80):  # Purple/blue family
        purple_count += count
    elif r < 80 and g < 80 and b < 80:  # Dark
        dark_count += count
    elif abs(r - g) < 20 and abs(g - b) < 20:  # Gray
        gray_count += count
    else:
        other_count += count

total = len(colored_pixels)
print(f"  Purple/Violet family: {purple_count} px ({purple_count/total*100:.1f}%)")
print(f"  Dark tones:           {dark_count} px ({dark_count/total*100:.1f}%)")
print(f"  Gray tones:           {gray_count} px ({gray_count/total*100:.1f}%)")
print(f"  Other:                {other_count} px ({other_count/total*100:.1f}%)")
