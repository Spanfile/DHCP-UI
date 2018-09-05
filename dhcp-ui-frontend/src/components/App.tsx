import * as React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import View from "./View";

export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="container">
        <Navbar loggedInAs="" />
        <div className="row">
          <Sidebar />
          <div className="col-sm-10 view-container">
            <View />
          </div>
        </div>
      </div>
    );
  }
}
