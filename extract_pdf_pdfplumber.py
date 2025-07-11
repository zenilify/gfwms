#!/usr/bin/env python3
"""
PDF Text Extraction using pdfplumber
"""

import pdfplumber
import sys
import os

def extract_pdf_with_pdfplumber(pdf_path):
    """Extract text from PDF using pdfplumber"""
    try:
        full_text = ""
        page_texts = []
        
        with pdfplumber.open(pdf_path) as pdf:
            print(f"PDF has {len(pdf.pages)} pages")
            
            # Extract text from all pages
            for page_num in range(len(pdf.pages)):
                page = pdf.pages[page_num]
                text = page.extract_text()
                
                if text:
                    page_texts.append(f"=== PAGE {page_num + 1} ===\n{text}\n")
                    full_text += text + "\n\n"
                    print(f"Page {page_num + 1}: {len(text)} characters extracted")
                else:
                    print(f"Page {page_num + 1}: No text found")
            
            return full_text, page_texts
    
    except Exception as e:
        print(f"Error extracting PDF with pdfplumber: {e}")
        import traceback
        traceback.print_exc()
        return None, None

def main():
    pdf_path = "/Users/ezenil/gfwms/Georg_Fischer_Seewis_Schulung_WMS.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"PDF file not found: {pdf_path}")
        sys.exit(1)
    
    print("Extracting text from PDF using pdfplumber...")
    full_text, page_texts = extract_pdf_with_pdfplumber(pdf_path)
    
    if full_text is None:
        print("Failed to extract text from PDF")
        sys.exit(1)
    
    # Save the extracted text
    with open("/Users/ezenil/gfwms/extracted_text_clean.txt", "w", encoding="utf-8") as f:
        f.write(full_text)
    
    with open("/Users/ezenil/gfwms/extracted_text_pages_clean.txt", "w", encoding="utf-8") as f:
        for page_text in page_texts:
            f.write(page_text)
    
    print(f"\nExtraction completed successfully!")
    print(f"Total characters extracted: {len(full_text)}")
    print(f"Total pages processed: {len(page_texts)}")
    print("Files saved:")
    print("- /Users/ezenil/gfwms/extracted_text_clean.txt")
    print("- /Users/ezenil/gfwms/extracted_text_pages_clean.txt")

if __name__ == "__main__":
    main()