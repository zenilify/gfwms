import fitz  # PyMuPDF
import os

# Define the PDF file path
pdf_path = "/Volumes/Transcend/PyCharm/gfwms/Georg_Fischer_Stoerung_WMS.pdf"

# Check if file exists
if not os.path.exists(pdf_path):
    print(f"Error: PDF file '{pdf_path}' not found.")
    print("Please check the file path and ensure the file exists in the current directory.")
    exit(1)

try:
    # Open the PDF document
    doc = fitz.open(pdf_path)
    
    # Check if the document was opened successfully
    if doc is None:
        print("Error: Failed to open the PDF document.")
        exit(1)
    
    # Extract text from all pages
    with open("Stoerungbehandlung.txt", "w", encoding="utf-8") as f:
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text()
            f.write(text + '\n')
    
    # Close the document
    doc.close()
    print("Text extraction completed successfully!")
    
except Exception as e:
    print(f"An error occurred: {e}")
    print("Please ensure PyMuPDF is properly installed and the PDF file is valid.")