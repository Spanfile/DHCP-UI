import IDDNSConfig, { DDNSUpdateStyle } from "common/config/ddns/IDDNSConfig";
import IConfigProps from "common/config/IConfigProps";
import ZoneConfig from "components/config/ddns/ZoneConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import ToggledInput from "components/form/ToggledInput";
import * as React from "react";
import KeyConfig from "./KeyConfig";

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
          <KeyConfig
            config={this.props.config.keys}
            onChange={(name, value) => this.onConfigChange("keys", name, value)} />
        </Card>
        <Card title="DDNS zones">
          <ZoneConfig
            config={this.props.config.zones}
            dnssecKeys={Object.values(this.props.config.keys).map(key => key.name)}
            onChange={(name, value) => this.onConfigChange("zones", name, value)} />
        </Card>
      </div>
    );
  }

  private onConfigChange = (config: string, name: string, value: any) => {
    const conf = this.props.config[config];
    if (!value) {
      delete conf[name];
    } else {
      conf[name] = value;
    }
    this.props.onChange(config, conf);
  }
}
