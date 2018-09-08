import { IDDNSZone } from "common/config/ddns/IDDNSZone";
import IConfigProps from "common/config/IConfigProps";
import { ButtonStyle } from "components/Button";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";

export interface IZoneConfigProps extends IConfigProps<IDDNSZone> {
  dnssecKeys: string[];
  onDelete: () => void;
}

export default class ZoneConfig extends React.Component<IZoneConfigProps, {}> {
  constructor(props: IZoneConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Card title={this.props.config.domain}>
        <InputGroup<IDDNSZone>
          onChange={this.props.onChange}
          source={this.props.config}>
          <TextInput label="Domain" name="domain" />
          <TextInput label="Primary nameserver" name="primary" />
          <SelectInput label="DNSSEC key" name="key" options={this.props.dnssecKeys} />
        </InputGroup>
        <FormButton style={ButtonStyle.Danger} onClick={this.props.onDelete}>
          Delete zone
        </FormButton>
      </Card>
    );
  }
}