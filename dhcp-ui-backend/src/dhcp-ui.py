import eventlet
eventlet.monkey_patch(select=False)

from subprocess import Popen, PIPE
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from lease_parser import Parser
from flask_socketio import SocketIO, send, emit
from watcher import Watcher

from blinker import Namespace, NamedSignal
signals = Namespace()

app = Flask(__name__)
app.config.from_envvar('DHCPUI_SETTINGS')
CORS(app)
socketio_logs = app.config['SOCKETIO_DEBUG_LOGS']
socketio = SocketIO(app, logger=socketio_logs, engineio_logger=socketio_logs)

leases_changed: NamedSignal = signals.signal('leases_changed')
watcher = Watcher(app.config['DHCP_LEASES'], leases_changed)
parser = Parser(app.config['DHCP_LEASES'])


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
    leases = [lease.get_serializable() for lease in parser.get_leases()]
    return jsonify(leases)


@app.route('/generatednssec', methods=['GET', 'POST'])
def generate_dnssec():
    if request.method == 'GET':
        available = False
        reason = ''

        p = Popen(['which', 'tsig-keygen'],
                  stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, _ = p.communicate()
        if p.returncode != 0:
            reason = 'tsig-keygen executable not found'
        else:
            available = True

        return jsonify({
            'available': available,
            'reason': reason
        })
    elif request.method == 'POST':
        algorithm = request.get_json()['algorithm']

        p = Popen(['tsig-keygen', '-a', algorithm, 'generated'],
                  stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate()
        if p.returncode != 0:
            abort(400)
        else:
            output = output.decode('utf-8')
            args = output.split()
            secret = args[args.index('secret') + 1].strip('";')
            return jsonify({
                'secret': secret
            })


@app.route('/generateconfig', methods=['POST'])
def generate_config():
    config = request.get_json()
    print(config)
    return "Hello!"


@leases_changed.connect_via(watcher)
def handle_leases_changed(sender):
    print('leases changed')
    socketio.emit(
        'leases',
        [lease.get_serializable() for lease in parser.get_leases()],
        namespace='/leases')


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")
