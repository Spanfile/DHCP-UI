import IDHCPConfig from "common/config/IDHCPConfig";
import IDHCPSubnet from "common/config/subnet/IDHCPSubnet";
import { AddressRange, Subnet } from "common/ip/IP";
import GlobalConfig from "components/config/GlobalConfig";
import SubnetsConfig from "components/config/SubnetsConfig";
import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

export default class Config extends React.Component<{}, IDHCPConfig> {
  constructor(props: any) {
    super(props);

    this.state = {
      global: {
        authoritative: true,
        defaultLeaseTime: 86400,
        maxLeaseTime: 86400,
        ddnsSettings: {
          updates: true,
          updateStyle: "interim",
          domainName: "domain.tld.",
          reverseDomainName: "in-addr.arpa.",
          ignoreClientUpdates: true,
          updateStaticLeases: true,
          useHostDeclNames: true
        }
      },
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
      <form onSubmit={this.onSave}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <NavLink to="/config/global" className="nav-link rounded-0" activeClassName="active">Global</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/config/subnets" className="nav-link rounded-0" activeClassName="active">Subnets</NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Redirect exact={true} from="/config" to="/config/global" />
            <Route path="/config/global" render={() =>
              <GlobalConfig config={this.state.global} onChange={this.onGlobalConfigChange} />}
            />
            <Route path="/config/subnets" render={() =>
              <SubnetsConfig subnets={this.state.subnets} onChange={this.onSubnetsConfigChange} />}
            />
          </Switch>
        </div>
        <button type="submit" className="btn btn-primary rounded-0">Build configuration and save</button>
      </form>
    );
  }

  private onGlobalConfigChange = (name: string, value: any) => {
    const state = this.state;
    state.global[name] = value;
    this.setState(state);
  }

  private onSubnetsConfigChange = (id: number, dhcpSubnet: IDHCPSubnet) => {
    const state = this.state;
    state.subnets[id] = dhcpSubnet;
    this.setState(state);
  }

  private onSave(event: any) {
    console.log("gonna save");
    event.preventDefault();
  }
}
