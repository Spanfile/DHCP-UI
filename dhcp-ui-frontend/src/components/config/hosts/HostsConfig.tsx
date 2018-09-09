import IConfigProps from "common/config/IConfigProps";
import { IHostsConfig } from "common/config/IHostsConfig";
import Button, { ButtonStyle } from "components/Button";
import HostConfig from "components/config/hosts/HostConfig";
import * as React from "react";

export default class HostsConfig extends React.Component<IConfigProps<IHostsConfig>, {}> {
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    const hostsConfig: JSX.Element[] = [];
    let skippedFirst = false;

    Object.entries(this.props.config).forEach(([id, host]) => {
      let colClass = "col-sm-9";
      if (!skippedFirst) {
        skippedFirst = true;
      } else {
        colClass += " offset-sm-3";
      }

      hostsConfig.push(
        <div key={id} className={colClass + " border-bottom pb-3 mb-3"}>
          <HostConfig
            config={host}
            onChange={(name, value) => this.onHostChange(Number(id), name, value)}
            onDelete={() => this.deleteHost(Number(id))}
          />
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="float-right">
            <Button style={ButtonStyle.Success} onClick={this.addHost}>
              Add host
            </Button>
          </div>
        </div>
        {hostsConfig}
      </div>
    );
  }

  private onHostChange = (id: number, name: string, value: any) => {
    const host = this.props.config[id];
    host[name] = value;
    this.props.onChange(id.toString(), host);
  }

  private addHost = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newHost = {
      hostname: "",
      hardware: "00:00:00:00:00:00",
      fixedAddress: "",
      ddnsHostname: "",
      options: {},
    };
    this.props.onChange(newId.toString(), newHost);
  }

  private deleteHost = (id: number) => {
    this.props.onChange(id.toString(), null);
  }
}