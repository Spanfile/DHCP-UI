import { DDNSUpdateStyle } from "common/config/ddns/IDDNSConfig";
import { DNSSECAlgorithm } from "common/config/ddns/IDNSSECKey";
import IDHCPConfig from "common/config/IDHCPConfig";
import { AddressRange, IPAddress, Subnet } from "common/ip/IP";
import Button, { ButtonStyle } from "components/Button";
import DDNSConfig from "components/config/DDNSConfig";
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
        options: {
          1: {
            name: "domain-name",
            expression: "ns1.domain.tld"
          },
          2: {
            name: "domain-name-servers",
            expression: "10.0.30.20, 10.0.30.21"
          }
        }
      },
      ddns: {
        updates: true,
        updateStyle: DDNSUpdateStyle.Interim,
        domainName: "domain.tld.",
        reverseDomainName: "in-addr.arpa.",
        ignoreClientUpdates: true,
        updateStaticLeases: true,
        useHostDeclNames: true,
        keys: {
          1: {
            name: "dhcpupdate",
            algorithm: DNSSECAlgorithm.HMAC_MD5,
            key: "secret"
          }
        },
        zones: {
          1: {
            domain: "domain.tld.",
            primary: "ns1.domain.tld",
            key: "dhcpupdate"
          },
          2: {
            domain: "10.0.10.in-addr.arpa.",
            primary: "ns1.domain.tld",
            key: "dhcpupdate"
          }
        }
      },
      subnets: {
        1: {
          subnet: Subnet.parseCidr("10.0.10.0/24"),
          range: AddressRange.fromAddressStringPair("10.0.10.1", "10.0.10.254"),
          options: {
            1: {
              name: "routers",
              expression: "10.0.10.1"
            },
            2: {
              name: "ntp-servers",
              expression: "10.0.10.1"
            }
          },
          hosts: {
            1: {
              hostname: "asd",
              hardware: "11:22:33:44:55:66",
              fixedAddress: IPAddress.parseString("10.0.10.2"),
              ddnsHostname: "asd",
              options: {
                1: {
                  name: "domain-name-servers",
                  expression: "1.1.1.1"
                }
              }
            }
          }
        },
        2: {
          subnet: Subnet.parseCidr("10.0.20.0/24"),
          range: AddressRange.fromAddressStringPair("10.0.20.1", "10.0.20.254"),
          options: {
            1: {
              name: "routers",
              expression: "10.0.20.1"
            },
            2: {
              name: "ntp-servers",
              expression: "10.0.20.1"
            }
          },
          hosts: {}
        },
        3: {
          subnet: Subnet.parseCidr("10.0.30.0/24"),
          range: AddressRange.fromAddressStringPair("10.0.30.1", "10.0.30.254"),
          options: {
            1: {
              name: "routers",
              expression: "10.0.30.1"
            },
            2: {
              name: "ntp-servers",
              expression: "10.0.30.1"
            }
          },
          hosts: {}
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
            <NavLink to="/config/ddns" className="nav-link rounded-0" activeClassName="active">DDNS</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/config/subnets" className="nav-link rounded-0" activeClassName="active">Subnets</NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Redirect exact={true} from="/config" to="/config/global" />
            <Route path="/config/global" render={() =>
              <GlobalConfig
                config={this.state.global}
                onChange={(name, value) => this.onConfigChange("global", name, value)}
              />}
            />
            <Route path="/config/ddns" render={() =>
              <DDNSConfig
                config={this.state.ddns}
                onChange={(name, value) => this.onConfigChange("ddns", name, value)}
              />}
            />
            <Route path="/config/subnets" render={() =>
              <SubnetsConfig
                config={this.state.subnets}
                onChange={(name, value) => this.onConfigChange("subnets", name, value)}
              />}
            />
          </Switch>
        </div>
        <Button
          style={ButtonStyle.Primary}
          onClick={this.onSave}>
          Build configuration and save
        </Button>
      </form>
    );
  }

  private onConfigChange = (config: string, property: string, value: any) => {
    const state = this.state;
    if (value == null) {
      delete state[config][property];
    } else {
      state[config][property] = value;
    }
    this.setState(state);
  }

  private onSave() {
    console.log("gonna save");
  }
}
