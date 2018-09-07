import { AddressRange, Subnet } from "common/ip/IP";
import IDHCPSubnet from "common/subnet/IDHCPSubnet";
import ISubnetsConfig from "common/subnet/ISubnetsConfig";
import * as React from "react";
import SubnetNav from "./subnet/SubnetNav";
import SubnetView from "./subnet/SubnetView";

export default class SubnetsConfig extends React.Component<{}, ISubnetsConfig> {
  constructor(props: ISubnetsConfig) {
    super(props);

    this.state = {
      subnets: {
        1: {
          id: 1,
          subnet: Subnet.parseCidr("10.0.10.0/24"),
          range: AddressRange.fromAddressStringPair("10.0.10.1", "10.0.10.254")
        },
        2: {
          id: 2,
          subnet: Subnet.parseCidr("10.0.20.0/24"),
          range: AddressRange.fromAddressStringPair("10.0.20.1", "10.0.20.254")
        },
        3: {
          id: 3,
          subnet: Subnet.parseCidr("10.0.30.0/24"),
          range: AddressRange.fromAddressStringPair("10.0.30.1", "10.0.30.254")
        }
      }
    };
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
                <SubnetNav subnets={this.state.subnets} />
              </div>
            </div>
          </div>
          <div className="col-sm-10">
            <SubnetView subnets={this.state.subnets} onChange={this.onSubnetChange} />
          </div>
        </div>
      </div>
    );
  }

  private onSubnetChange = (id: number, dhcpSubnet: IDHCPSubnet) => {
    const state = this.state;
    state.subnets[id] = dhcpSubnet;
    this.setState(state);
  }
}
