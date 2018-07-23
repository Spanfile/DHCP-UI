from ipaddress import IPv4Address
from json import JSONEncoder
from datetime import datetime
from typing import Dict, Any, List, Callable, Optional, Tuple


class Lease:
    def __init__(self, address: IPv4Address) -> None:
        self._values: Dict[str, Any] = {
            'address': int(address)
        }

    def get_serializable(self) -> Dict[str, Any]:
        return self._values

    def set_value(self, statement: str, value: Any):
        self._values[statement] = value


class Parser:
    def __init__(self, filename: str) -> None:
        self._filename = filename
        self._parsed_leases: List[Lease] = []
        self._active_lease: Optional[Lease] = None

        self._actions = {
            'lease': self._begin_lease,
            '}': self._end_lease,
            'starts': _date_parser('starts', self._set_lease_value),
            'ends': _date_parser('ends', self._set_lease_value),
            'tstp': _date_parser('tstp', self._set_lease_value),
            'tsfp': _date_parser('tsfp', self._set_lease_value),
            'atsfp': _date_parser('atsfp', self._set_lease_value),
            'cltt': _date_parser('cltt', self._set_lease_value),
            'hardware': self._lease_hardware,
            'uid': self._lease_uid,
            'binding state': _binding_state_parser('binding state', self._set_lease_value),
            'next binding state': _binding_state_parser('next binding state', self._set_lease_value),
            'rewind binding state': _binding_state_parser('rewind binding state', self._set_lease_value),
            'set': _set_parser(self._set_lease_value),
            'option': _option_parser(self._set_lease_value)
        }

    def _set_lease_value(self, name: str, value: Any) -> None:
        assert self._active_lease is not None
        self._active_lease.set_value(name, value)

    def reset(self):
        self._parsed_leases = []

    def get_leases(self) -> List[Lease]:
        self.reset()
        with open(self._filename) as f:
            linenum = 1
            for line in [line.strip().strip(';') for line in f if not line.startswith('#')]:
                if not line:
                    continue

                args = line.split()

                scanned = self._scan_statement(args)
                if not scanned:
                    # print('unknown line #' + str(linenum), line)
                    pass
                else:
                    statement, call_args = scanned
                    func = self._actions[statement]
                    func(call_args)

                linenum += 1

        assert self._active_lease is None
        return self._parsed_leases

    def _scan_statement(self, args: List[str]) -> Optional[Tuple[str, List[str]]]:
        for i in range(len(args)):
            statement = ' '.join(args[0:i + 1])
            if statement in self._actions:
                return (statement, args[i + 1:])
        return None

    def _begin_lease(self, args: List[str]) -> None:
        assert self._active_lease is None
        assert args[1] == '{'
        address = IPv4Address(args[0])
        self._active_lease = Lease(address)

    def _end_lease(self, args: List[str]) -> None:
        assert self._active_lease is not None
        self._parsed_leases.append(self._active_lease)
        self._active_lease = None

    def _lease_hardware(self, args: List[str]) -> None:
        hardware = args[0]
        address = int(args[1].replace(':', ''), 16)
        self._set_lease_value('hardware', address)

    def _lease_uid(self, args: List[str]) -> None:
        uid = args[0].strip('"')
        self._set_lease_value('uid', uid)

    def _lease_client_hostname(self, args: List[str]) -> None:
        hostname = args[0].strip('"')
        self._set_lease_value('client-hostname', hostname)


def _date_parser(name: str, set_lease_value: Callable[[str, Any], None]):
    def _parse(args: List[str]):
        full_datestr = args[1] + ' ' + args[2]
        date = datetime.strptime(full_datestr, '%Y/%m/%d %H:%M:%S')
        set_lease_value(name, date.isoformat())
    return _parse


def _binding_state_parser(name: str, set_lease_value: Callable[[str, Any], None]):
    def _parse(args: List[str]):
        state = args[0]
        set_lease_value(name, state)
    return _parse


def _set_parser(set_lease_value: Callable[[str, Any], None]):
    def _parse(args: List[str]):
        variable_name = args[0]
        value = args[2].strip('"')
        set_lease_value('set ' + variable_name, value)
    return _parse


def _option_parser(set_lease_value: Callable[[str, Any], None]):
    def _parse(args: List[str]):
        variable_name = args[0]
        value = args[1].strip('"')
        set_lease_value('option ' + variable_name, value)
    return _parse
