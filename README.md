# Actoress lookalike predictor app

### The Idea

Using Tensorflow and Keras deep learning to train a convolutional neural network model to predict
which Hollywood actor/actress the user's selfie looks like the most.

There are 12 classes (6 women and 6 men) to compare with. The actors and the actresses are picked up
according to my favourites.

### Prerequisites (at the moment)

- Flask 1.1.1
- Flask-Cors 3.0.8
- gunicorn 20.0.4
- h5py 2.10.0
- numpy 1.18.2
- Pillow 7.0.0
- pip 20.0.2
- Python 3.6.8
- (Python) setuptools 46.1.3
- tensorflow 2.0.0
- Heroku for deploying

### Usage

Go to: [Actoress prediction App](https://actoress-prediction.herokuapp.com/static/predict-actoress.html)

UI is mobile-freindly also

- Click the "Choose file" button
- Choose a file (accepted formats: .png and .jpg)
- Click the "Predict" button
- And there you go! You have the top 5 results

### Issues

- While testing with different images, it may give a prediction that a man-user is actress or vice versa. This may be just an issue with too small amount of train-data and the similarity of different actor's/actress' images in the train data.

### Data augmentation and preparation

I picked up 2 images of each actor/actress and augmented 25 + 25 images
for training and 5 + 5 images for validation. So for each actor/actress 50 training images and 10 validation images. Check out the [`actoress-data-tree.txt`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/create-model/actoress-data-tree.txt)

For the augmentation and details for the ImageDataGenerator processes check out:

[ImageDataGenerator Class](https://keras.io/api/preprocessing/image/)

### Creating and fine tuning model (MobileNet) to own use + save the model

Specified comments in the [`create_save_model.py`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/create-model/create_save_model.py)

But in a nutshell:

Create paths for training and validation data, prepare the data, import the pre-trained model, fine-tune it for own purposes, compile and fit the
new model and save it.

### Loading the model

I have the [`app.py`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/app.py) and the model `mn_actoress_model2.h5` in the root of my project.
Then in the app.py I have a function to load the model:

```python
from tensorflow.keras.models import load_model
.
.
.
def get_model():
    global model
    model = load_model('mn_actoress_model2.h5')
    print(' * Model loaded!')
```

### User's image preparation for the model

Check out the [`app.py`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/app.py) for the details

### Creating the Front-End

- HTML-base [`predict-actoress.html`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/static/predict-actoress.html)
- Names-Object for prediction classes (JSON-style) [`act_classes.js`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/static/act_classes.js)
- Front-End functions with jQuery [`predict.js`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/static/predict.js)
- Styles (also scaling for mobile device) [`styles.css`](https://github.com/harrinupponen/actoress-lookalike-predictor-app/blob/master/static/styles.css)

### Deploying the Application to Heroku

Go to the root folder of your project. Create local git repo, add all files to it and commit changes.
- `git init`
- `git add .`
- `git commit -m "init commit"`

Login to Heroku, create new app and push the local git repo to the Heroku git repository
- `heroku login`
- `heroku create <app-name>`
- `git push heroku master`