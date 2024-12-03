from flask import Flask;

app = Flask(__name__)

@app.route('/turn_fan', methods=['POST'])
def turn_fan():

if __name__ == '__main__':
    app.run(host='192.168.15.186', port=3334)