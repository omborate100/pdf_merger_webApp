from flask import Flask,request,send_file
from PyPDF2 import PdfMerger
from flask_cors import CORS
import os
from io import BytesIO

app = Flask(__name__)
cors = CORS(app)
@app.route('/upload',methods = ['POST'])
def upload():
    if request.method == 'POST':
        pdfs = request.files.getlist('pdf_files')

    merger = PdfMerger()
    for pdf in pdfs:
        merger.append(pdf)

    buffer = BytesIO()
    merger.write(buffer)

    merger.close()  # Close the PdfMerger object after writing the merged PDF
    print("merging")
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name='merged.pdf')



if __name__ == '__main__':
    app.run(debug=True)