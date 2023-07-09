from flask import Flask, request, render_template, send_file
import base64
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save():
    imageData = request.form.get('imageData')
    imageType = request.form.get('imageType')

    if imageData and imageType:
        imageData = imageData.replace('data:image/png;base64,', '')
        imageData = imageData.replace('data:image/jpeg;base64,', '')

        imageBytes = base64.b64decode(imageData)

        filename = 'drawing.' + imageType
        with open(filename, 'wb') as f:
            f.write(imageBytes)

        return 'Imagen guardada con exito'

    return 'Error al guardar la imagen'

@app.route('/download/<filename>')
def download(filename):
    return send_file(filename, as_attachment=True)
    
if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
