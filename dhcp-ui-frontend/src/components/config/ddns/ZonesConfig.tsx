import { IDDNSZone, IDDNSZones } from "common/config/ddns/IDDNSZone";
import IConfigProps from "common/config/IConfigProps";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import { ZoneConfig } from "components/config/ddns/ZoneConfig";
import * as React from "react";

export interface IZonesConfigProps extends IConfigProps<IDDNSZones> {
  dnssecKeys: string[];
}

export default class ZonesConfig extends React.Component<IZonesConfigProps> {
  private zoneConfig: any;

  constructor(props: IZonesConfigProps) {
    super(props);

    this.zoneConfig = ZoneConfig(this.props.dnssecKeys);
  }

  public render(): JSX.Element {
    return (
      <ConfigCollectionView<IDDNSZone>
        config={this.props.config}
        addButtonText="Add zone"
        component={this.zoneConfig}
        onAdd={this.addZone}
        onChange={this.onZoneChange}
        onDelete={this.deleteZone} />
    );
  }

  private onZoneChange = (id: number, name: keyof IDDNSZone, value: any) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id, key);
  }

  private addZone = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newZone = {
      domain: "",
      primary: "",
      key: ""
    };
    this.props.onChange(newId, newZone);
  }

  private deleteZone = (id: number) => {
    this.props.onChange(id, undefined);
  }
}
