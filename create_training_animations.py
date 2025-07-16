#!/usr/bin/env python3
"""
Create animated training videos from extracted images
"""

import os
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import argparse
try:
    from moviepy.editor import *
    import numpy as np
    MOVIEPY_AVAILABLE = True
except ImportError:
    MOVIEPY_AVAILABLE = False
    print("MoviePy not available, only GIF creation will work")

def create_title_frame(title, subtitle="", duration=3):
    """Create a title frame for the video"""
    # Create blank image
    img = Image.new('RGB', (1920, 1080), color='#003c8f')
    draw = ImageDraw.Draw(img)
    
    # Try to use a better font, fallback to default
    try:
        title_font = ImageFont.truetype("Arial.ttf", 72)
        subtitle_font = ImageFont.truetype("Arial.ttf", 48)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_x = (1920 - title_width) // 2
    title_y = (1080 - title_height) // 2 - 50
    draw.text((title_x, title_y), title, fill='white', font=title_font)
    
    # Draw subtitle if provided
    if subtitle:
        subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
        subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
        subtitle_x = (1920 - subtitle_width) // 2
        subtitle_y = title_y + title_height + 50
        draw.text((subtitle_x, subtitle_y), subtitle, fill='#cccccc', font=subtitle_font)
    
    # Convert to numpy array and create clip
    img_array = np.array(img)
    return ImageClip(img_array).set_duration(duration)

def create_section_title(title, duration=2):
    """Create a section title frame"""
    img = Image.new('RGB', (1920, 1080), color='#f8f9fa')
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("Arial.ttf", 60)
    except:
        font = ImageFont.load_default()
    
    # Draw centered title
    bbox = draw.textbbox((0, 0), title, font=font)
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    x = (1920 - width) // 2
    y = (1080 - height) // 2
    draw.text((x, y), title, fill='#003c8f', font=font)
    
    img_array = np.array(img)
    return ImageClip(img_array).set_duration(duration)

def process_training_image(image_path, duration=5, zoom_effect=True):
    """Process a training image with effects"""
    img = Image.open(image_path)
    
    # Resize to fit 1920x1080 while maintaining aspect ratio
    img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
    
    # Create background
    background = Image.new('RGB', (1920, 1080), color='white')
    
    # Paste image centered
    x = (1920 - img.width) // 2
    y = (1080 - img.height) // 2
    background.paste(img, (x, y))
    
    # Convert to numpy array
    img_array = np.array(background)
    clip = ImageClip(img_array).set_duration(duration)
    
    # Add zoom effect if requested
    if zoom_effect:
        clip = clip.resize(lambda t: 1 + 0.1 * t / duration)
    
    return clip

def create_training_video(module_name, images_data, output_path):
    """Create an animated training video for a module"""
    clips = []
    
    # Add title screen
    clips.append(create_title_frame(
        f"WMS Training: {module_name}",
        "Georg Fischer Jungheinrich WMS",
        duration=5
    ))
    
    # Group images by section
    sections = {
        "System Architecture": [],
        "User Interface": [],
        "Navigation": [],
        "Practical Examples": []
    }
    
    # Categorize images based on page numbers
    for img in images_data:
        page = img['page']
        if page < 20:
            sections["System Architecture"].append(img)
        elif page < 40:
            sections["User Interface"].append(img)
        elif page < 60:
            sections["Navigation"].append(img)
        else:
            sections["Practical Examples"].append(img)
    
    # Create clips for each section
    for section_name, section_images in sections.items():
        if section_images:
            # Add section title
            clips.append(create_section_title(section_name))
            
            # Add images from section
            for img in section_images[:5]:  # Limit to 5 images per section
                try:
                    img_clip = process_training_image(img['path'], duration=4)
                    clips.append(img_clip)
                except Exception as e:
                    print(f"Error processing {img['path']}: {e}")
    
    # Add end screen
    clips.append(create_title_frame(
        "Training Complete!",
        "Visit the training portal for more modules",
        duration=5
    ))
    
    # Concatenate all clips
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Add background music (if available)
    # You can add background music here if you have a file
    
    # Write video file
    final_video.write_videofile(
        output_path,
        fps=24,
        codec='libx264',
        audio_codec='aac'
    )
    
    return output_path

def create_module_animations():
    """Create animations for different training modules"""
    # Load extraction summary
    with open('assets/images/pdf_extracts/extraction_summary.json', 'r') as f:
        extraction_data = json.load(f)
    
    # Find the training PDF data
    training_data = None
    for pdf_data in extraction_data:
        if 'Schulung' in pdf_data['pdf_name']:
            training_data = pdf_data
            break
    
    if not training_data:
        print("No training PDF data found")
        return
    
    # Create output directory
    output_dir = Path('assets/videos/training')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Define modules to create
    modules = {
        "basics": {
            "name": "WMS Grundlagen",
            "page_range": (1, 50)
        },
        "navigation": {
            "name": "Systemnavigation",
            "page_range": (20, 30)
        },
        "inventory": {
            "name": "Bestandsverwaltung",
            "page_range": (100, 150)
        }
    }
    
    # Create videos for each module
    for module_id, module_info in modules.items():
        print(f"\nCreating animation for {module_info['name']}...")
        
        # Filter images for this module
        module_images = [
            img for img in training_data['images']
            if module_info['page_range'][0] <= img['page'] <= module_info['page_range'][1]
        ]
        
        if module_images:
            output_path = output_dir / f"{module_id}_training.mp4"
            try:
                create_training_video(
                    module_info['name'],
                    module_images,
                    str(output_path)
                )
                print(f"Created: {output_path}")
            except Exception as e:
                print(f"Error creating video for {module_id}: {e}")

def create_gif_previews():
    """Create GIF previews from key images"""
    with open('assets/images/pdf_extracts/extraction_summary.json', 'r') as f:
        extraction_data = json.load(f)
    
    output_dir = Path('assets/images/training_gifs')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Create GIFs for key concepts
    concepts = {
        "login_process": [20, 21, 22],
        "navigation_menu": [24, 25, 26],
        "warehouse_layout": [35, 36, 37]
    }
    
    for pdf_data in extraction_data:
        if 'Schulung' in pdf_data['pdf_name']:
            for concept_name, page_numbers in concepts.items():
                images = []
                for img in pdf_data['images']:
                    if img['page'] in page_numbers:
                        try:
                            pil_img = Image.open(img['path'])
                            pil_img.thumbnail((800, 600), Image.Resampling.LANCZOS)
                            images.append(pil_img)
                        except Exception as e:
                            print(f"Error loading image: {e}")
                
                if images:
                    output_path = output_dir / f"{concept_name}.gif"
                    images[0].save(
                        output_path,
                        save_all=True,
                        append_images=images[1:],
                        duration=2000,
                        loop=0
                    )
                    print(f"Created GIF: {output_path}")

def main():
    parser = argparse.ArgumentParser(description='Create training animations')
    parser.add_argument('--videos', action='store_true', help='Create video animations')
    parser.add_argument('--gifs', action='store_true', help='Create GIF previews')
    parser.add_argument('--all', action='store_true', help='Create all animations')
    args = parser.parse_args()
    
    if args.all or args.videos:
        if MOVIEPY_AVAILABLE:
            print("Creating training videos...")
            create_module_animations()
        else:
            print("MoviePy not available, skipping video creation")
    
    if args.all or args.gifs:
        print("\nCreating GIF previews...")
        create_gif_previews()
    
    if not any([args.videos, args.gifs, args.all]):
        print("Please specify --videos, --gifs, or --all")

if __name__ == "__main__":
    main()