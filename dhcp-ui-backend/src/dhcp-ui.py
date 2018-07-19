from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/detectdhcpserver')
def hello_world():
    return jsonify({
        'serviceName': 'isc-dhcp-server',
        'configDir': '/etc/dhcp/',
        'logFile': '/var/log/dhcp',
        'logInJournal': False,
        'leaseFile': '/var/lib/dhcp.leases'
    })
