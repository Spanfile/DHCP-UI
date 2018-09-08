import { IDDNSZones } from "common/config/ddns/IDDNSConfig";
import IDDNSZone from "common/config/ddns/IDDNSZone";
import IConfigProps from "common/config/IConfigProps";
import Button from "components/form/Button";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";

export interface IZoneConfigProps extends IConfigProps<IDDNSZones> {
  dnssecKeys: string[];
}

export default class ZoneConfig extends React.Component<IZoneConfigProps, {}> {
  constructor(props: IZoneConfigProps) {
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
          <Card title={key.domain}>
            <InputGroup<IDDNSZone>
              onChange={(name, value) => this.onInputChange(Number(id), name, value)}
              source={key}>
              <TextInput label="Domain" name="domain" />
              <TextInput label="Primary nameserver" name="primary" />
              <SelectInput label="DNSSEC key" name="key" options={this.props.dnssecKeys} />
            </InputGroup>
            <Button label="Delete zone" style="danger" onClick={e => { return; }} />
          </Card>
        </div>);
    });

    return (
      <div className="row">
        <div className="col-sm-3">
          <button type="button" className="rounded-0 btn btn-success float-right">Add zone</button>
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
}
