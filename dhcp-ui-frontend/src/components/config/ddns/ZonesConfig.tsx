import { IDDNSZones } from "common/config/ddns/IDDNSZone";
import IConfigProps from "common/config/IConfigProps";
import Button, { ButtonStyle } from "components/Button";
import ZoneConfig from "components/config/ddns/ZoneConfig";
import * as React from "react";

export interface IZonesConfigProps extends IConfigProps<IDDNSZones> {
  dnssecKeys: string[];
}

export default class ZonesConfig extends React.Component<IZonesConfigProps, {}> {
  constructor(props: IZonesConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    const keyConfigs: JSX.Element[] = [];
    let skippedFirst = false;

    Object.entries(this.props.config).forEach(([id, key]) => {
      let colClass = "col-sm-9";
      if (!skippedFirst) {
        skippedFirst = true;
      } else {
        colClass += " offset-sm-3";
      }

      keyConfigs.push(
        <div key={id} className={colClass}>
          <ZoneConfig
            config={key}
            onChange={(name, value) => this.onInputChange(Number(id), name, value)}
            onDelete={() => this.deleteZone(Number(id))}
            dnssecKeys={this.props.dnssecKeys}
          />
        </div>);
    });

    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="float-right">
            <Button label="Add zone" style={ButtonStyle.Success} onClick={this.addZone} />
          </div>
        </div>
        {keyConfigs}
      </div>
    );
  }

  private onInputChange = (id: number, name: string, value: any) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id.toString(), key);
  }

  private addZone = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newZone = {
      domain: "",
      primary: "",
      key: ""
    };
    this.props.onChange(newId.toString(), newZone);
  }

  private deleteZone = (id: number) => {
    this.props.onChange(id.toString(), null);
  }
}
