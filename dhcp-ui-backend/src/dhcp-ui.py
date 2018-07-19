from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/detectdhcpserver')
def hello_world():
    return jsonify({
        'configDir': '/etc/dhcp/',
        'leaseFile': '/var/lib/dhcp.leases',
        'logFile': '/var/log/dhcp'
    })
