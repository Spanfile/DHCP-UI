import * as React from "react";

export default class TabNav extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      <ul className="nav nav-tabs" role="tablist">
        {React.Children.map(this.props.children, child =>
          <li className="nav-item">
            {child}
          </li>)}
      </ul>
    );
  }
}