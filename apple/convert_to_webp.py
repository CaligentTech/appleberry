import os
import re
from PIL import Image

image_dir = 'images'
backup_dir = os.path.join(image_dir, 'original_backups')

if not os.path.exists(backup_dir):
    os.makedirs(backup_dir)

replacements = {}

for filename in os.listdir(image_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        filepath = os.path.join(image_dir, filename)
        if not os.path.isfile(filepath): continue
        
        name, _ = os.path.splitext(filename)
        webp_filename = name + '.webp'
        webp_filepath = os.path.join(image_dir, webp_filename)
        
        try:
            with Image.open(filepath) as img:
                img.save(webp_filepath, 'WEBP', quality=85)
            
            # Move old file to backup
            os.rename(filepath, os.path.join(backup_dir, filename))
            
            replacements[filename] = webp_filename
            print(f"Converted {filename} -> {webp_filename}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

# Update HTML and CSS files
for root, dirs, files in os.walk('.'):
    # Skip backup dir or git
    if 'original_backups' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.css', '.js')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original_content = content
            for old_name, new_name in replacements.items():
                # Replace exact filename matches
                content = re.sub(r'(?<![a-zA-Z0-9_-])' + re.escape(old_name) + r'(?![a-zA-Z0-9_-])', new_name, content)
            
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated references in {filepath}")

print("Done!")
