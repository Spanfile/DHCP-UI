import { IDDNSSettings, IGlobalConfig } from "common/config/IGlobalConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import NumberInput from "components/form/NumberInput";
import TextInput from "components/form/TextInput";
import * as React from "react";
import ToggledInput from "../form/ToggledInput";

export interface IGlobalConfigProps {
  config: IGlobalConfig;
  onChange: (name: string, value: any) => void;
}

export default class GlobalConfig extends React.Component<IGlobalConfigProps, {}> {
  constructor(props: IGlobalConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="Common">
          <InputGroup<IGlobalConfig> onChange={this.onGlobalInputChanged} source={this.props.config}>
            <ToggledInput label="Authoritative" name="authoritative" />
            <NumberInput label="Default lease time" name="defaultLeaseTime" />
            <NumberInput label="Max. lease time" name="maxLeaseTime" />
          </InputGroup>
        </Card>
        <Card title="DDNS">
          <InputGroup<IDDNSSettings> onChange={this.onDdnsInputChanged} source={this.props.config.ddnsSettings}>
            <ToggledInput label="DDNS updates" name="updates" />
            <TextInput label="Update style" name="updateStyle" />
            <TextInput label="Domain name" name="domainName" />
            <TextInput label="Reverse domain name" name="reverseDomainName" />
            <ToggledInput label="Ignore client updates" name="ignoreClientUpdates" />
            <ToggledInput label="Update static leases" name="updateStaticLeases" />
            <ToggledInput label="Use host declared names" name="useHostDeclNames" />
          </InputGroup>
        </Card>
      </div>
    );
  }

  private onGlobalInputChanged = (name: string, value: any) => {
    this.props.onChange(name, value);
  }

  private onDdnsInputChanged = (name: string, value: any) => {
    const ddns = this.props.config.ddnsSettings;
    ddns[name] = value;
    this.props.onChange("ddnsSettings", ddns);
  }
}
