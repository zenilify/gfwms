#!/usr/bin/env python3
"""
PDF Text Extraction Script
Extracts text content from the Georg Fischer WMS Training PDF
"""

import fitz  # PyMuPDF
import sys
import os

def extract_pdf_text(pdf_path):
    """Extract text from PDF file"""
    try:
        # Open the PDF
        doc = fitz.open(pdf_path)
        
        if doc is None:
            print("Failed to open PDF document")
            return None, None
        
        # Extract text from all pages
        full_text = ""
        page_texts = []
        
        print(f"PDF has {doc.page_count} pages")
        
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            text = page.get_text()
            page_texts.append(f"=== PAGE {page_num + 1} ===\n{text}\n")
            full_text += text + "\n\n"
            print(f"Processed page {page_num + 1}")
        
        doc.close()
        
        return full_text, page_texts
        
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        import traceback
        traceback.print_exc()
        return None, None

def main():
    pdf_path = "/Users/ezenil/gfwms/Georg_Fischer_Seewis_Schulung_WMS.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"PDF file not found: {pdf_path}")
        sys.exit(1)
    
    print("Extracting text from PDF...")
    full_text, page_texts = extract_pdf_text(pdf_path)
    
    if full_text is None:
        print("Failed to extract text from PDF")
        sys.exit(1)
    
    # Save full text to file
    with open("/Users/ezenil/gfwms/extracted_text.txt", "w", encoding="utf-8") as f:
        f.write(full_text)
    
    # Save page-by-page text
    with open("/Users/ezenil/gfwms/extracted_text_pages.txt", "w", encoding="utf-8") as f:
        for page_text in page_texts:
            f.write(page_text)
    
    print(f"Text extraction completed!")
    print(f"Total characters extracted: {len(full_text)}")
    print(f"Total pages processed: {len(page_texts)}")
    print("Files saved:")
    print("- /Users/ezenil/gfwms/extracted_text.txt")
    print("- /Users/ezenil/gfwms/extracted_text_pages.txt")

if __name__ == "__main__":
    main()