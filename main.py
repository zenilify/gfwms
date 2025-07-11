import pdfplumber

with pdfplumber.open("Georg_Fischer_Störungsbehandlung.pdf") as pdf, open("stoerungsbehebung.txt", "w", encoding="utf-8") as f:
    for page in pdf.pages:
        t = page.extract_text()
        if t:
            f.write(t + '\n')