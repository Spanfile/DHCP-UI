import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import View from 'components/View';
import * as React from 'react';
import './App.css';

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
