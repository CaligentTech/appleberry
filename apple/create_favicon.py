import sys
from PIL import Image

def create_favicon(input_path, output_path, size=96):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Get dimensions
        width, height = img.size
        
        # Determine the size of the square
        max_dim = max(width, height)
        
        # Create a new transparent square image
        new_img = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
        
        # Calculate position to paste the original image to center it
        paste_x = (max_dim - width) // 2
        paste_y = (max_dim - height) // 2
        
        # Paste the original image
        new_img.paste(img, (paste_x, paste_y), img)
        
        # Resize to the required favicon size (e.g., 96x96)
        new_img = new_img.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save as PNG
        new_img.save(output_path, format="PNG")
        print(f"Successfully created favicon at {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_favicon(
        "/Users/alanbenny/apple/Appleberry/apple/images/logo8-Photoroom.webp",
        "/Users/alanbenny/apple/Appleberry/apple/images/favicon-96x96.png"
    )
