from ipaddress import IPv4Address
from typing import Dict, Any, List, Callable


class Lease:
    address: IPv4Address
    statements: Dict[str, Any]

    def __init__(self, address: IPv4Address) -> None:
        self.address = address


class Parser:
    def __init__(self, filename: str) -> None:
        self._filename = filename
        self._actions = {
            'lease': self._action_begin_lease
        }
        self._parsed_leases: List[Lease] = []

        self._italicized_normal: str

    def reset(self):
        self._parsed_leases = []

    def get_leases(self) -> List[Lease]:
        self.reset()
        with open(self._filename) as f:
            for line in [line.strip() for line in f if not line.startswith('#')]:
                args = line.split()
                statement = args[0]

        return []

    def _get_statement_action(self, statement: str) -> Callable[[List[str]], None]:
        pass

    def _action_begin_lease(self, args: List[str]):
        assert args[1] == '{'
        address = IPv4Address(args[0])
        self._active_lease = Lease(address)

    def _end_lease(self, args: List[str]):
        self._parsed_leases.append(self._active_lease)
