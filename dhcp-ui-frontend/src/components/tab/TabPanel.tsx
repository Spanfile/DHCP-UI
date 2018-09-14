import * as React from "react";

export default class TabPanel extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active pb-0 pt-3 pl-3 pr-3" role="tabpanel">
        {this.props.children}
      </div>
    );
  }
}
