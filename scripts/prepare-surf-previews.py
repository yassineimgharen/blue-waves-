"""Optional preview refresh: python3 scripts/prepare-surf-previews.py (requires Pillow).
New surf photos also appear automatically without running this script, using lazy originals.
"""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json
root = Path(__file__).resolve().parent.parent
metadata_path = root / 'src/data/surfArchiveMetadata.json'
previous = json.loads(metadata_path.read_text()) if metadata_path.exists() else {}
output = root / 'src/images/surf-previews'
output.mkdir(exist_ok=True)
metadata = {}
seen = {}
for path in sorted((root / 'src/images/surf').rglob('*')):
    if path.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp', '.avif'}:
        continue
    image = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    width, height = image.size
    entry = {'alt': previous.get(path.name, {}).get('alt', 'Surf archive photograph'), 'width': width, 'height': height}
    metadata[path.name] = entry
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest in seen:
        entry['duplicateOf'] = seen[digest]
        continue
    seen[digest] = path.name
    for size in (384, 768):
        preview = image.copy()
        preview.thumbnail((size, round(size * height / width)))
        preview.save(output / f'{path.name}.{size}.webp', 'WEBP', quality=78, method=6)
metadata_path.write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n')
print(f'Prepared responsive previews for {len(seen)} unique surf photographs.')
