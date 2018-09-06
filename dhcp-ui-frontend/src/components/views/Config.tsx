import GlobalConfig from "components/config/GlobalConfig";
import SubnetsConfig from "components/config/SubnetsConfig";
import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

export default class Config extends React.Component {
  public render(): JSX.Element {
    return (
      <form onSubmit={this.save}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <NavLink to="/config/general" className="nav-link rounded-0" activeClassName="active">General</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/config/subnets" className="nav-link rounded-0" activeClassName="active">Subnets</NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Redirect exact={true} from="/config" to="/config/general" />
            <Route path="/config/general" component={GlobalConfig} />
            <Route path="/config/subnets" component={SubnetsConfig} />
          </Switch>
        </div>
        <button type="submit" className="btn btn-primary rounded-0">Build configuration and save</button>
      </form>
    );
  }

  private save(event: any) {
    console.log("gonna save");
    event.preventDefault();
  }
}
