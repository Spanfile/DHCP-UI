import IConfigProps from "common/config/IConfigProps";
import { ISubnetsConfig } from "common/config/subnet/IDHCPSubnet";
import { AddressRange, Subnet } from "common/ip/IP";
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
          <div className="col-sm-3">
            <div className="row">
              <div className="col-sm-12">
                <Button style={ButtonStyle.Success} onClick={this.addSubnet}>
                  Add subnet
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-12 sidebar">
                <SubnetNav subnets={this.props.config} />
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <SubnetView
              config={this.props.config}
              onChange={this.props.onChange}
              onSubnetDelete={this.deleteSubnet}
            />
          </div>
        </div>
      </div>
    );
  }

  private addSubnet = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newSubnet = {
      subnet: Subnet.parseCidr("192.168.0.0/24"),
      range: AddressRange.fromAddressStringPair("192.168.0.2", "192.168.0.254"),
      options: {
        1: {
          name: "routers",
          expression: "192.168.0.1"
        },
      }
    };
    this.props.onChange(newId.toString(), newSubnet);
  }

  private deleteSubnet = (id: number) => {
    this.props.onChange(id.toString(), null);
  }
}
