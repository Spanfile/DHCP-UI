from os import path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class Watcher():
    def __init__(self, filename: str, signal) -> None:
        self._filename = filename
        self._changed_signal = signal

        handler = WatcherEventHandler(filename, self._changed)

        obs = Observer()
        obs.schedule(handler, path.dirname(filename))
        obs.start()
        self._observer = obs

    def stop(self):
        self._observer.stop()
        self._observer.join()

    def _changed(self):
        self._changed_signal.send(self)


class WatcherEventHandler(FileSystemEventHandler):
    def __init__(self, filename: str, callback) -> None:
        self._filename = filename
        self._callback = callback

    def on_modified(self, event):
        if (event.src_path == self._filename):
            self._callback()
        return super().on_modified(event)
