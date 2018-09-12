import IDDNSConfig, { DDNSUpdateStyle } from "common/config/ddns/IDDNSConfig";
import { IConfigProps } from "common/config/IConfigProps";
import KeysConfig from "components/config/ddns/KeysConfig";
import ZonesConfig from "components/config/ddns/ZonesConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import ToggledInput from "components/form/inputs/ToggledInput";
import * as React from "react";

export default class DDNSConfig extends React.Component<IConfigProps<IDDNSConfig>, {}> {
  constructor(props: IConfigProps<IDDNSConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="Common">
          <InputGroup<IDDNSConfig> onChange={this.props.onChange} source={this.props.config}>
            <ToggledInput label="DDNS updates" name="updates" />
            <SelectInput<string> label="Update style" name="updateStyle" options={Object.values(DDNSUpdateStyle)} />
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
            onChange={(name, value) => this.onConfigChange("keys", name, value)} />
        </Card>
        <Card title="DDNS zones">
          <ZonesConfig
            config={this.props.config.zones}
            dnssecKeys={Object.values(this.props.config.keys).map(key => key.name)}
            onChange={(name, value) => this.onConfigChange("zones", name, value)} />
        </Card>
      </div>
    );
  }

  private onConfigChange = (config: keyof IDDNSConfig, name: number, value: any) => {
    const conf = this.props.config[config];
    if (value == null) {
      delete conf[name];
    } else {
      conf[name] = value;
    }
    this.props.onChange(config, conf);
  }
}
