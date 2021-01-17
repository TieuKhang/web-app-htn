from flask import (Flask, request, render_template,
                   json, jsonify, url_for, session,Response)
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
import os
from werkzeug.utils import secure_filename
import logging
from PIL import Image
import os  # should be removed in final version

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "hackthenorth-be7580cfcf6a.json"

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)
api = Api(app)

UPLOAD_FOLDER = './images'
UPLOAD_FOLDERCAM = './cameraimg'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'rgba'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'


class Logo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    logo = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.logo}'


def todo_serializer(todo):
    return {
        'id': todo.id,
        'content': todo.content,
    }


def logo_serializer(logo):
    return {
        'id': logo.id,
        'logo': logo.logo,
    }


def visapi_serializer(logo):
    return {
        'description': logo.description,
    }


@app.route("/")
def my_index():
    return render_template("index.html")


@app.route("/api", methods=['GET'])
@cross_origin()
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])


@app.route("/api/create", methods=['POST'])
@cross_origin()
def create():
    request_data = json.loads(request.data)
    todo = Todo(content=request_data['content'])

    db.session.add(todo)
    db.session.commit()

    return {'201': 'Add succesfully'}


@app.route("/api/create/<int:id>", methods=['POST'])
@cross_origin()
def edit(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).update(
        {'content': request_data['content']})
    db.session.commit()


@app.route('/api/<int:id>', methods=['GET'])
@cross_origin()
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])


@app.route('/api/<int:id>/delete', methods=['POST'])
@cross_origin()
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).delete()
    db.session.commit()


@app.route('/upload', methods=['POST'])
@cross_origin()
def fileUpload():
    target = os.path.join(UPLOAD_FOLDER, '')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    session['uploadFilePath'] = destination
    response = "Upload successfully"
    return response


@app.route('/uploadcam', methods=['POST', 'GET'])
@cross_origin()
def camUpload():
    target = os.path.join(UPLOAD_FOLDERCAM, '')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file']
    img = Image.open(file.stream)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    img.save('./cameraimg/imagefile.png')
    logo_name = detect_logos('./cameraimg/imagefile.png')
    logo_name = jsonify([*map(visapi_serializer,logo_name)])
    logo_val = json.loads(logo_name.data)
    logo = Logo(logo=logo_val[0]['description'])

    db.session.add(logo)
    db.session.commit()
    return "Successfully add"


def detect_logos(path):
    """Detects logos in the file."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.logo_detection(image=image)
    logos = response.logo_annotations
    print(logos)

    for logo in logos:
        print(logo.description)

    return logos

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))


@app.route("/uploadlogo", methods=['GET'])
@cross_origin()
def uploadlogo():
    return jsonify([*map(logo_serializer, Logo.query.all())])


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True)
