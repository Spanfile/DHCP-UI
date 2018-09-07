import IDHCPSubnet from "common/config/subnet/IDHCPSubnet";
import ISubnetsConfig from "common/config/subnet/ISubnetsConfig";
import * as React from "react";
import SubnetNav from "./subnet/SubnetNav";
import SubnetView from "./subnet/SubnetView";

export interface ISubnetsConfigProps {
  subnets: ISubnetsConfig;
  onChange: (id: number, dhcpSubnet: IDHCPSubnet) => void;
}

export default class SubnetsConfig extends React.Component<ISubnetsConfigProps, {}> {
  constructor(props: ISubnetsConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <div className="row">
          <div className="col-sm-2">
            <div className="row">
              <div className="col-sm-12">
                <button type="button" className={"rounded-0 btn btn-success"}>Add subnet</button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-12 sidebar">
                <SubnetNav subnets={this.props.subnets} />
              </div>
            </div>
          </div>
          <div className="col-sm-10">
            <SubnetView subnets={this.props.subnets} onChange={this.onSubnetChange} />
          </div>
        </div>
      </div>
    );
  }

  private onSubnetChange = (id: number, dhcpSubnet: IDHCPSubnet) => {
    this.props.onChange(id, dhcpSubnet);
  }
}
