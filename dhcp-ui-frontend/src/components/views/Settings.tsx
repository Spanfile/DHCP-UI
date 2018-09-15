import Button, { ButtonStyle } from "components/Button";
import DHCPUISettings from "components/settings/DHCPUISettings";
import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

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
        <Button style={ButtonStyle.Primary} onClick={this.save}>Save</Button>
      </form>
    );
  }

  private save() {
    console.log("gonna save");
  }
}
