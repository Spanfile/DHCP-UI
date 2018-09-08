import IDDNSConfig, { DDNSUpdateStyle } from "common/config/ddns/IDDNSConfig";
import IDNSSECKey from "common/config/ddns/IDNSSECKey";
import IConfigProps from "common/config/IConfigProps";
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
          <KeyConfig config={this.props.config.keys} onChange={this.onKeyChange} />
        </Card>
      </div>
    );
  }

  private onKeyChange = (name: string, key: IDNSSECKey) => {
    const keys = this.props.config.keys;
    keys[name] = key;
    this.props.onChange("keys", keys);
  }
}
