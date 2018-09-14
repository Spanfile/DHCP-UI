import IConfigProps from "common/config/IConfigProps";
import IHostConfig, { IHostsConfig } from "common/config/IHostsConfig";
import { IPAddress } from "common/ip/IP";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import { HostConfig } from "components/config/hosts/HostConfig";
import * as React from "react";

export default class HostsConfig extends React.Component<IConfigProps<IHostsConfig>, {}> {
  constructor(props: IConfigProps<IHostsConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ConfigCollectionView<IHostConfig>
        config={this.props.config}
        addButtonText="Add host"
        component={HostConfig}
        onAdd={this.addHost}
        onChange={this.onHostChange}
        onDelete={this.deleteHost} />
    );
  }

  private onHostChange = (id: number, name: keyof IHostConfig, value: any) => {
    const host = this.props.config[id];
    host[name] = value;
    this.props.onChange(id, host);
  }

  private addHost = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newHost = {
      common: {
        hostname: "",
        hardware: "00:00:00:00:00:00",
        fixedAddress: IPAddress.parseString("192.168.0.1"),
        ddnsHostname: ""
      },
      options: {},
    };
    this.props.onChange(newId, newHost);
  }

  private deleteHost = (id: number) => {
    this.props.onChange(id, undefined);
  }
}