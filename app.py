import tensorflow as tf
import base64
import numpy as np
import io
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from flask import request
from flask import jsonify
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Load the model
def get_model():
    global model
    model = load_model('mn_actoress_model2.h5')
    print(' * Model loaded!')

#Preprocess the image for the model
def preprocess_image(image, target_size):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = image.astype('float32')
    image = (image - 127.5) / 127.5            #The MobileNet model is originally trained
    image = np.expand_dims(image, axis=0)      #with images in scale [-1, 1] so we fix the RGB
                                                #values from 255 to 1
    return image

print(' * Loading Keras model...')
get_model()

@app.route('/predict', methods=['POST'])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)     #We use the base64 encoded image data
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocess_image(image, target_size=(224, 224))
    prediction = model.predict(processed_image).tolist()

    response = prediction[0]
    
    return jsonify(response)