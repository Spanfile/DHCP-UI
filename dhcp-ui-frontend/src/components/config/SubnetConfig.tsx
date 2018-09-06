import ISubnetConfig from "common/subnet/ISubnetConfig";
import * as React from "react";

export default class SubnetConfig extends React.Component<ISubnetConfig, ISubnetConfig> {
  constructor(props: ISubnetConfig) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        asd
      </div>
    );
  }
}
