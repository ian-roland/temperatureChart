from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/temperature_and_datetime')
def get_temperature_and_datetime():
    try:
     
        try:
            result = subprocess.run(['vcgencmd', 'measure_temp'], stdout=subprocess.PIPE, check=True)
            output = result.stdout.decode('utf-8').strip()
            temperature = float(output.split('=')[1].strip("'C"))
            control_fan(temperature)
        except subprocess.CalledProcessError:
            temperature = None  # Indicate temperature unavailable

        current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return jsonify({'temperature': temperature, 'datetime': current_datetime})

    except Exception as e:  # Catch any unexpected errors
        return jsonify({'error': str(e)}), 500

threshold_temperature = 40  

def control_fan(temperature):
    if temperature >= threshold_temperature:
        subprocess.run(["set_pwm_fan_m", "255"]) 
    else:
        subprocess.run(["set_pwm_fan_m", "0"])

if __name__ == '__main__':
    app.run(host='192.168.15.186', port=3334)
