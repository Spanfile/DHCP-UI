import IConfigProps from "common/config/IConfigProps";
import { IDHCPSubnetsConfig } from "common/config/subnet/IDHCPSubnet";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";
import SubnetNav from "./subnet/SubnetNav";
import SubnetView from "./subnet/SubnetView";

export default class SubnetsConfig extends React.Component<IConfigProps<IDHCPSubnetsConfig>> {
  constructor(props: IConfigProps<IDHCPSubnetsConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-sm-2 pr-0">
          <div className="mb-3">
            <Button style={ButtonStyle.Success} onClick={this.addSubnet}>Add subnet</Button>
          </div>
          <SubnetNav subnets={this.props.config} />
        </div>
        <div className="col-sm-10">
          <SubnetView
            config={this.props.config}
            onChange={this.props.onChange}
            onSubnetDelete={this.deleteSubnet} />
        </div>
      </div>
    );
  }

  private readonly addSubnet = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newSubnet = {
      common: {
        subnet: "192.168.0.0/24",
        range: "192.168.0.2-192.168.0.254"
      },
      options: {
        1: {
          name: "routers",
          expression: "192.168.0.1"
        },
      },
      hosts: {}
    };
    this.props.onChange(newId, newSubnet);
  }

  private readonly deleteSubnet = (id: number) => {
    this.props.onChange(id, undefined);
  }
}
