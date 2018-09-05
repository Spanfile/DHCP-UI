import * as React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import View from "./View";

export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="container-fluid">
        <Navbar loggedInAs="" />
        <Sidebar />
        <View />
      </div>
    );
  }
}
