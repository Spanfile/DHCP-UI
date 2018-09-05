import eventlet
eventlet.monkey_patch(select=False)

from flask import Flask, jsonify
from flask_cors import CORS
from lease_parser import Parser
from flask_socketio import SocketIO, send, emit
from threading import get_ident
from watcher import Watcher

from blinker import Namespace, NamedSignal
signals = Namespace()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hello!'
CORS(app)
socketio = SocketIO(app, logger=True, engineio_logger=True)
print('socketio created on id ' + str(get_ident()))

leases_changed: NamedSignal = signals.signal('leases_changed')
watcher = Watcher('sample/dhcpd.leases', leases_changed)


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


@leases_changed.connect_via(watcher)
def handle_leases_changed(sender):
    print('leases changed, emitting on id ' + str(get_ident()))
    with app.app_context():
        socketio.emit('leases', namespace='/leases')


if __name__ == '__main__':
    socketio.run(app)
