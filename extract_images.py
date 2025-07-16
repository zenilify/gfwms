#!/usr/bin/env python3
"""
Extract images from PDF files for training documentation
"""

import os
import sys
import json
from pathlib import Path
import fitz  # PyMuPDF
import argparse
from PIL import Image
import io

def extract_images_from_pdf(pdf_path, output_dir):
    """Extract all images from a PDF file"""
    pdf_file = fitz.open(pdf_path)
    pdf_name = Path(pdf_path).stem
    images_extracted = []
    
    # Create output directory for this PDF
    pdf_output_dir = output_dir / pdf_name
    pdf_output_dir.mkdir(parents=True, exist_ok=True)
    
    image_count = 0
    
    for page_num in range(len(pdf_file)):
        page = pdf_file[page_num]
        image_list = page.get_images(full=True)
        
        for img_index, img in enumerate(image_list):
            # Get the image data
            xref = img[0]
            pix = fitz.Pixmap(pdf_file, xref)
            
            if pix.n - pix.alpha < 4:  # GRAY or RGB
                img_data = pix.tobytes("png")
            else:  # CMYK: Convert to RGB first
                pix1 = fitz.Pixmap(fitz.csRGB, pix)
                img_data = pix1.tobytes("png")
                pix1 = None
            
            # Save the image
            image_count += 1
            img_filename = f"page_{page_num+1:03d}_img_{img_index+1:02d}.png"
            img_path = pdf_output_dir / img_filename
            
            with open(img_path, "wb") as img_file:
                img_file.write(img_data)
            
            # Open with PIL to get dimensions
            with Image.open(io.BytesIO(img_data)) as pil_img:
                width, height = pil_img.size
            
            images_extracted.append({
                "page": page_num + 1,
                "filename": img_filename,
                "path": str(img_path),
                "width": width,
                "height": height
            })
            
            pix = None
    
    pdf_file.close()
    
    return {
        "pdf_name": pdf_name,
        "pdf_path": str(pdf_path),
        "total_images": image_count,
        "output_directory": str(pdf_output_dir),
        "images": images_extracted
    }

def create_image_gallery_html(extraction_results, output_file):
    """Create an HTML gallery of extracted images"""
    html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>Training Images Gallery</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .pdf-section {
            margin-bottom: 40px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .pdf-title {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }
        .image-card {
            background: #fafafa;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            text-align: center;
        }
        .image-card img {
            max-width: 100%;
            height: auto;
            max-height: 200px;
            object-fit: contain;
        }
        .image-info {
            margin-top: 10px;
            font-size: 12px;
            color: #666;
        }
        .stats {
            background: #e9ecef;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <h1>Training Documentation Images</h1>
"""
    
    for result in extraction_results:
        html_content += f"""
    <div class="pdf-section">
        <h2 class="pdf-title">{result['pdf_name']}</h2>
        <div class="stats">
            <strong>Total Images:</strong> {result['total_images']} | 
            <strong>Source:</strong> {Path(result['pdf_path']).name}
        </div>
        <div class="image-grid">
"""
        
        for img in result['images']:
            html_content += f"""
            <div class="image-card">
                <img src="{img['path']}" alt="Page {img['page']} Image">
                <div class="image-info">
                    Page {img['page']}<br>
                    {img['width']}x{img['height']}px
                </div>
            </div>
"""
        
        html_content += """
        </div>
    </div>
"""
    
    html_content += """
</body>
</html>
"""
    
    with open(output_file, 'w') as f:
        f.write(html_content)

def main():
    parser = argparse.ArgumentParser(description='Extract images from PDF files')
    parser.add_argument('--output-dir', default='assets/images/pdf_extracts', 
                       help='Output directory for extracted images')
    parser.add_argument('--create-gallery', action='store_true',
                       help='Create HTML gallery of extracted images')
    args = parser.parse_args()
    
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Find all PDF files
    pdf_files = list(Path('.').glob('*.pdf'))
    
    if not pdf_files:
        print("No PDF files found in current directory")
        return
    
    print(f"Found {len(pdf_files)} PDF files")
    
    all_results = []
    
    for pdf_path in pdf_files:
        print(f"\nProcessing: {pdf_path}")
        try:
            result = extract_images_from_pdf(pdf_path, output_dir)
            all_results.append(result)
            print(f"  Extracted {result['total_images']} images")
        except Exception as e:
            print(f"  Error: {str(e)}")
    
    # Save extraction summary
    summary_file = output_dir / 'extraction_summary.json'
    with open(summary_file, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\nExtraction summary saved to: {summary_file}")
    
    # Create gallery if requested
    if args.create_gallery:
        gallery_file = output_dir / 'image_gallery.html'
        create_image_gallery_html(all_results, gallery_file)
        print(f"Image gallery created: {gallery_file}")

if __name__ == "__main__":
    main()