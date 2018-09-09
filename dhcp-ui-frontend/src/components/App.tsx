import * as React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import View from "./View";

export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="container-fluid p-0">
        <Navbar loggedInAs="" />
        <div className="row">
          <Sidebar />
          <View />
        </div>
      </div>
    );
  }
}
