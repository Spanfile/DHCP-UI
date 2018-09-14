import { IDDNSZone } from "common/config/ddns/IDDNSZone";
import { IConfigCollection } from "common/config/ICommonConfig";
import { ButtonStyle } from "components/Button";
import { DeletableConfig } from "components/config/DeletableConfig";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";

export function ZoneConfig(dnssecKeys: IConfigCollection<string>) {
  return DeletableConfig<IDDNSZone>("zone",props =>
    <Card title={props.config.domain}>
      <InputGroup<IDDNSZone>
        onChange={props.onChange}
        config={props.config}>
        <TextInput label="Domain" name="domain" />
        <TextInput label="Primary NS" name="primary" />
        <SelectInput<string> label="DNSSEC key" name="key" options={dnssecKeys} />
      </InputGroup>
      <FormButton style={ButtonStyle.Danger} onClick={props.openDeleteModal}>
        Delete zone
      </FormButton>
    </Card>);
}
