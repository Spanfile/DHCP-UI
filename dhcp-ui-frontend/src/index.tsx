import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "components/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "registerServiceWorker";
import "./index.css";

const appElement = document.getElementById("root") as HTMLElement;
Modal.setAppElement(appElement);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  appElement
);
registerServiceWorker();
