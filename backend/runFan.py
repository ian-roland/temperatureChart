from flask import Flask;
from flask_cors import CORS
import RPi.GPIO as GPIO
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/turn_fan', methods=['POST'])
def turn_fan():
    
if __name__ == '__main__':
    app.run(host='192.168.15.186', port=3334)