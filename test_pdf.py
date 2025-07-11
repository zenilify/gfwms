#!/usr/bin/env python3
"""
Simple PDF test script to debug the issue
"""

import fitz  # PyMuPDF
import sys

def test_pdf_open():
    pdf_path = "/Users/ezenil/gfwms/Georg_Fischer_Seewis_Schulung_WMS.pdf"
    
    try:
        print(f"Attempting to open: {pdf_path}")
        doc = fitz.open(pdf_path)
        print(f"Document opened successfully")
        print(f"Type of doc: {type(doc)}")
        print(f"Document page count: {doc.page_count}")
        
        # Try to get first page
        if doc.page_count > 0:
            page = doc.load_page(0)
            print(f"First page loaded successfully")
            text = page.get_text()
            print(f"Text extracted from first page (first 500 chars):")
            print(text[:500])
            
        doc.close()
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    test_pdf_open()