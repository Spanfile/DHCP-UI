import { IDDNSZone, IDDNSZones } from "common/config/ddns/IDDNSZone";
import { IConfigCollection } from "common/config/ICommonConfig";
import IConfigProps, { ICollectionConfigProps, ValueOf } from "common/config/IConfigProps";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import { ZoneConfig } from "components/config/ddns/ZoneConfig";
import * as React from "react";

export interface IZonesConfigProps extends IConfigProps<IDDNSZones> {
  dnssecKeys: IConfigCollection<string>;
}

export default class ZonesConfig extends React.Component<IZonesConfigProps> {
  private readonly zoneConfig: React.ComponentClass<ICollectionConfigProps<IDDNSZone>>;

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

  private readonly onZoneChange = (id: number, name: keyof IDDNSZone, value: ValueOf<IDDNSZone>) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id, key);
  }

  private readonly addZone = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newZone = {
      domain: "",
      primary: "",
      key: ""
    };
    this.props.onChange(newId, newZone);
  }

  private readonly deleteZone = (id: number) => {
    this.props.onChange(id, undefined);
  }
}
