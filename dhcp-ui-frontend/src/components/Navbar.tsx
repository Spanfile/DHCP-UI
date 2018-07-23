import * as React from 'react';

export interface INavbarProps {
  loggedInAs: string;
}

export default class Navbar extends React.Component<INavbarProps, object> {
  constructor(props: INavbarProps) {
    super(props);
  }

  public render(): JSX.Element {
    const isLoggedIn = this.props.loggedInAs !== '';

    let buttonText = "Log in";
    if (isLoggedIn) {
      buttonText = "Log out";
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <a href="/" className="navbar-brand">DHCP UI</a>
        <div>
          <button className="btn btn-secondary rounded-0">
            {buttonText}
          </button>
        </div>
      </nav>
    );
  }
}
