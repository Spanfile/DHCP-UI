from flask import Flask, jsonify
from flask_cors import CORS
from lease_parser import Parser
from flask_socketio import SocketIO, send, emit
from watcher import Watcher
from blinker import Namespace
signals = Namespace()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hello!'
CORS(app)
socketio = SocketIO(app, logger=True, engineio_logger=True)


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


@socketio.on('connect', namespace='/leases')
def on_connect():
    print('new connection')


def handle_leases_changed(sender):
    print('leases changed, emitting event')
    socketio.emit('leases', namespace='/leases')


leases_changed = signals.signal('leases_changed')
leases_changed.connect(handle_leases_changed)
watcher = Watcher('sample/dhcpd.leases', leases_changed)

if __name__ == '__main__':
    socketio.run(app)
