import * as React from "react";
import { NavLink } from "react-router-dom";

export default class Sidebar extends React.Component {
  // tslint:disable-next-line:no-any
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="sidebar col-sm-2">
        <nav className="nav flex-column">
          <NavLink to="/" exact={true} activeClassName="bg-dark text-white" className="nav-link">Home</NavLink>
          <NavLink to="/leases" activeClassName="bg-dark text-white" className="nav-link">Leases</NavLink>
          <NavLink to="/config" activeClassName="bg-dark text-white" className="nav-link">Configuration</NavLink>
          <NavLink to="/log" activeClassName="bg-dark text-white" className="nav-link">Log</NavLink>
          <NavLink to="/settings" activeClassName="bg-dark text-white" className="nav-link">Settings</NavLink>
        </nav>
      </div>
    );
  }
}
