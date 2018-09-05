from os import path
from watchdog.observers.polling import PollingObserver
from watchdog.events import FileSystemEventHandler
from blinker import NamedSignal


class Watcher():
    def __init__(self, filename: str, signal: NamedSignal) -> None:
        self._filename = filename
        self._changed_signal: NamedSignal = signal

        handler = WatcherEventHandler(filename, self._changed)

        obs = PollingObserver()
        obs.schedule(handler, path.dirname(filename))
        obs.start()
        self._observer = obs

    def stop(self) -> None:
        self._observer.stop()
        self._observer.join()

    def _changed(self) -> None:
        self._changed_signal.send(self)


class WatcherEventHandler(FileSystemEventHandler):
    def __init__(self, filename: str, callback) -> None:
        self._filename = filename
        self._callback = callback

    def on_modified(self, event):
        if (event.src_path == self._filename):
            self._callback()
        return super().on_modified(event)
