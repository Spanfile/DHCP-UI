from flask import Flask, jsonify
from flask_cors import CORS
from lease_parser import Parser
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hello!'
CORS(app)
socketio = SocketIO(app)


@app.route('/detectdhcpserver')
def hello_world():
    return jsonify({
        'serviceName': 'isc-dhcp-server',
        'configDir': '/etc/dhcp/',
        'logFile': '/var/log/dhcp',
        'logInJournal': False,
        'leaseFile': '/var/lib/dhcp.leases'
    })


@app.route('/leases')
def leases():
    parser = Parser('sample/dhcpd.leases')
    leases = [lease.get_serializable() for lease in parser.get_leases()]
    return jsonify(leases)


@socketio.on('hello', namespace='/leases')
def handle_message():
    print('got message')


if __name__ == '__main__':
    socketio.run(app)
