import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import GlobalConfig from "../config/GlobalConfig";

export default class Config extends React.Component {
  public render(): JSX.Element {
    return (
      <form onSubmit={this.save}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <NavLink to="/config/general" className="nav-link rounded-0" activeClassName="active">General</NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Redirect exact={true} from="/config" to="/config/general" />
            <Route path="/config/general" component={GlobalConfig} />
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
