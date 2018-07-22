import DHCPUISettings from "containers/settings/DHCPUISettings";
import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "./Settings.css";

export default class Settings extends React.Component {
  public render(): JSX.Element {
    return (
      <form onSubmit={this.save}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <NavLink to="/settings/dhcp-ui" className="nav-link rounded-0" activeClassName="active">DHCP UI</NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Redirect exact={true} from="/settings" to="/settings/dhcp-ui" />
            <Route path="/settings/dhcp-ui" component={DHCPUISettings} />
          </Switch>
        </div>
        <button type="submit" className="btn btn-primary rounded-0">Save</button>
      </form>
    );
  }

  private save(event: any) {
    console.log("gonna save");
    event.preventDefault();
  }
}
