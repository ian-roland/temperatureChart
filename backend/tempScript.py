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
            # Manual mode: always turn fan ON
            subprocess.run(["i2cset", "-y", "10", "0x2f", "0x30", "0xff"])
            print("Fan ON (manual mode)")
        else:
            # Automatic mode: control based on temperature
            if temperature >= threshold_temperature:
                subprocess.run(["i2cset", "-y", "10", "0x2f", "0x30", "0xff"]) 
                print("Fan ON (auto: temperature >= threshold)")
            else:
                subprocess.run(["i2cset", "-y", "10", "0x2f", "0x30", "0x00"])
                print("Fan OFF (auto: temperature < threshold)")
    except Exception as e:  # Use general exception for better error handling
        print(f"Fan control error: {str(e)}")

@app.route('/temperature_and_datetime')
def get_temperature_and_datetime():
    try:
        result = subprocess.run(['vcgencmd', 'measure_temp'], 
                               stdout=subprocess.PIPE, 
                               stderr=subprocess.PIPE,
                               text=True)
        if result.returncode == 0:
            output = result.stdout.strip()
            # More robust temperature parsing
            temperature = float(output.split('=')[1].replace("'C", ""))
            print(temperature)
        else:
            temperature = None
            print(f"Temperature read error: {result.stderr}")
        
        # Control fan based on temperature and mode
        control_fan(temperature)
        
        current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return jsonify({'temperature': temperature, 'datetime': current_datetime})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/toggle_manual_fan', methods=['POST'])
def toggle_manual_fan():
    global manual_fan_state
    manual_fan_state = not manual_fan_state
    print(f"Manual fan state toggled to: {manual_fan_state}")
    return jsonify({
        'message': 'Manual fan state toggled',
        'manual_state': manual_fan_state
    })

if __name__ == '__main__':
    app.run(host='192.168.15.178', port=3334, debug=True)