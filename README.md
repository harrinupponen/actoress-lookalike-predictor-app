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

### Data augmentation and preparation

I picked up 2 images of each actor/actress and augmented 25 + 25 images
for training and 5 + 5 images for validation. So for each actor/actress 50 training images and 10 validation images. Check out the `actoress-data-tree.txt`

### Creating and fine tuning model (MobileNet) to own use



### Saving and loading the model



### User's image preparation for CNN model



### Deploying the Flask Back-End to Heroku



### Creating the Front-End



### Deploying the Front-End to Heroku