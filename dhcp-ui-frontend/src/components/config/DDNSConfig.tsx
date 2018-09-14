import IDDNSConfig, { DDNSUpdateStyle, ICommonDDNSConfig } from "common/config/ddns/IDDNSConfig";
import { IConfigCollection } from "common/config/ICommonConfig";
import IConfigProps, { handleConfigChange } from "common/config/IConfigProps";
import KeysConfig from "components/config/ddns/KeysConfig";
import ZonesConfig from "components/config/ddns/ZonesConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import ToggledInput from "components/form/inputs/ToggledInput";
import * as hash from "object-hash";
import * as React from "react";

export default class DDNSConfig extends React.Component<IConfigProps<IDDNSConfig>> {
  constructor(props: IConfigProps<IDDNSConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    const keys: IConfigCollection<string> = {};
    Object.entries(this.props.config.keys).forEach(([key, value]) => {
      keys[key] = value.name;
    });

    return (
      <>
        <Card title="Common">
          <InputGroup<ICommonDDNSConfig>
            config={this.props.config.common}
            onChange={handleConfigChange("common", this.props)}>
            <ToggledInput label="DDNS updates" name="updates" />
            <SelectInput<string> label="Update style" name="updateStyle" options={DDNSUpdateStyle} />
            <TextInput label="Domain name" name="domainName" />
            <TextInput label="Reverse domain name" name="reverseDomainName" />
            <ToggledInput label="Ignore client updates" name="ignoreClientUpdates" />
            <ToggledInput label="Update static leases" name="updateStaticLeases" />
            <ToggledInput label="Use host declared names" name="useHostDeclNames" />
          </InputGroup>
        </Card>
        <Card title="DNSSEC keys">
          <KeysConfig
            config={this.props.config.keys}
            onChange={handleConfigChange("keys", this.props)} />
        </Card>
        <Card title="DDNS zones">
          <ZonesConfig
            key={hash(keys)}
            config={this.props.config.zones}
            dnssecKeys={keys}
            onChange={handleConfigChange("zones", this.props)} />
        </Card>
      </>
    );
  }
}
