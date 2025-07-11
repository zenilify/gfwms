#!/usr/bin/env python3
"""
Alternative PDF extraction using different methods
"""

import fitz  # PyMuPDF
import sys
import os

def extract_with_context_manager():
    """Try extraction with context manager approach"""
    pdf_path = "/Users/ezenil/gfwms/Georg_Fischer_Seewis_Schulung_WMS.pdf"
    
    try:
        print("Attempting extraction with context manager...")
        with fitz.open(pdf_path) as doc:
            if doc is None:
                print("Document is None")
                return None
            
            print(f"Successfully opened PDF with {doc.page_count} pages")
            
            full_text = ""
            page_texts = []
            
            # Extract text from each page
            for page_num in range(min(5, doc.page_count)):  # Start with first 5 pages
                print(f"Processing page {page_num + 1}...")
                page = doc.load_page(page_num)
                text = page.get_text()
                page_texts.append(f"=== PAGE {page_num + 1} ===\n{text}\n")
                full_text += text + "\n\n"
                print(f"Page {page_num + 1}: {len(text)} characters extracted")
            
            return full_text, page_texts
            
    except Exception as e:
        print(f"Error with context manager: {e}")
        import traceback
        traceback.print_exc()
        return None

def extract_direct_method():
    """Try direct method without context manager"""
    pdf_path = "/Users/ezenil/gfwms/Georg_Fischer_Seewis_Schulung_WMS.pdf"
    
    try:
        print("Attempting direct extraction...")
        doc = fitz.Document(pdf_path)
        
        if doc is None:
            print("Document is None")
            return None
            
        print(f"Successfully opened PDF with {doc.page_count} pages")
        
        full_text = ""
        page_texts = []
        
        # Extract text from each page
        for page_num in range(min(5, doc.page_count)):  # Start with first 5 pages
            print(f"Processing page {page_num + 1}...")
            page = doc[page_num]
            text = page.get_text()
            page_texts.append(f"=== PAGE {page_num + 1} ===\n{text}\n")
            full_text += text + "\n\n"
            print(f"Page {page_num + 1}: {len(text)} characters extracted")
        
        doc.close()
        return full_text, page_texts
        
    except Exception as e:
        print(f"Error with direct method: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    print("Testing PDF extraction methods...\n")
    
    # Try context manager first
    result = extract_with_context_manager()
    if result is None:
        print("\nContext manager failed, trying direct method...\n")
        result = extract_direct_method()
    
    if result is None:
        print("All extraction methods failed")
        sys.exit(1)
    
    full_text, page_texts = result
    
    # Save the extracted text
    with open("/Users/ezenil/gfwms/extracted_text.txt", "w", encoding="utf-8") as f:
        f.write(full_text)
    
    with open("/Users/ezenil/gfwms/extracted_text_pages.txt", "w", encoding="utf-8") as f:
        for page_text in page_texts:
            f.write(page_text)
    
    print(f"\nExtraction completed successfully!")
    print(f"Total characters extracted: {len(full_text)}")
    print(f"Total pages processed: {len(page_texts)}")

if __name__ == "__main__":
    main()