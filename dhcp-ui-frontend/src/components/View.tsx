import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './views/Config';
import Home from './views/Home';
import Leases from './views/Leases';
import Log from './views/Log';
import Settings from './views/Settings';

export default class View extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route path='/leases' component={Leases} />
        <Route path='/config' component={Config} />
        <Route path='/log' component={Log} />
        <Route path='/settings' component={Settings} />
      </Switch>
    );
  }
}
