import { IDDNSZones } from "common/config/ddns/IDDNSConfig";
import IDDNSZone from "common/config/ddns/IDDNSZone";
import IConfigProps from "common/config/IConfigProps";
import Button, { ButtonStyle } from "components/Button";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";
import FormButton from "../../form/FormButton";

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
            <FormButton label="Delete zone" style={ButtonStyle.Danger} onClick={() => this.deleteZone(Number(id))} />
          </Card>
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
    return;
  }

  private deleteZone = (id: number) => {
    return;
  }
}
