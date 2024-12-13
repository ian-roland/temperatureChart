from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
from datetime import datetime

app = Flask(__name__)
CORS(app)

manual_fan_state = False
threshold_temperature = 50

def control_fan(temperature):
    try:
        if manual_fan_state:
            subprocess.run(["i2cset", "-y", "10", "0x2f", "0x30", "0xff"])
            print("Fan Turned ON => control_fan(temperature), manual_fan_state")
        else:
            if temperature >= threshold_temperature:
                subprocess.run(["i2cset", "-y", "10", "0x2f", "0x30", "0xff"]) 
                print("Fan Turned ON => control_fan(temperature), temperature >= threshold_temperature")
                toggle_manual_fan()
            else:
                subprocess.run(["i2cset", "-y", "10", "0x2f", "0x30", "0x00"])
                print("Fan Turned OFF => control_fan(temperature), temperature < threshold_temperature")
                toggle_manual_fan()
    except subprocess.CalledProcessError as e:
        print(f"Error controlling fan: {e}")

@app.route('/temperature_and_datetime')
def get_temperature_and_datetime():
    try:
    
        try:
            result = subprocess.run(['vcgencmd', 'measure_temp'], stdout=subprocess.PIPE, check=True)
            output = result.stdout.decode('utf-8').strip()
            temperature = float(output.split('=')[1].strip("'C"))
            print(temperature)
            control_fan(temperature)
        except subprocess.CalledProcessError:
            temperature = None  # Indicate temperature unavailable

        current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return jsonify({'temperature': temperature, 'datetime': current_datetime})

    except Exception as e:  # Catch any unexpected errors
        return jsonify({'error': str(e)}), 500

@app.route('/toggle_manual_fan', methods=['POST'])
def toggle_manual_fan():
    global manual_fan_state
    manual_fan_state = not manual_fan_state
    return jsonify({'message': 'Manual fan state toggled'})

if __name__ == '__main__':
    app.run(host='192.168.15.186', port=3334)
