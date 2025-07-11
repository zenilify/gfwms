import fitz # PyMuPDF

doc = fitz.open(Georg_Fischer_Störungsbehandlung.pdf)
with open("stoerungsbehebung.txt", "w", encoding="utf-8") as f:
    for page in doc:
        text = page.get_text()
        f.write(text)