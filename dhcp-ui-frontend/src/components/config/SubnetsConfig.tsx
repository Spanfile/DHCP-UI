import IConfigProps from "common/config/IConfigProps";
import ISubnetsConfig from "common/config/subnet/ISubnetsConfig";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";
import SubnetNav from "./subnet/SubnetNav";
import SubnetView from "./subnet/SubnetView";

export default class SubnetsConfig extends React.Component<IConfigProps<ISubnetsConfig>, {}> {
  constructor(props: IConfigProps<ISubnetsConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <div className="row">
          <div className="col-sm-2">
            <div className="row">
              <div className="col-sm-12">
                <Button label="Add subnet" style={ButtonStyle.Success} onClick={this.addSubnet} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-12 sidebar">
                <SubnetNav subnets={this.props.config} />
              </div>
            </div>
          </div>
          <div className="col-sm-10">
            <SubnetView config={this.props.config} onChange={this.props.onChange} />
          </div>
        </div>
      </div>
    );
  }

  private addSubnet = () => {
    return;
  }
}
