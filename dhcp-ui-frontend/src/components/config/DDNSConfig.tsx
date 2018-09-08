import IConfigProps from "common/config/IConfigProps";
import IDDNSConfig from "common/config/IDDNSConfig";
import * as React from "react";
import Card from "../form/Card";
import InputGroup from "../form/InputGroup";
import TextInput from "../form/TextInput";
import ToggledInput from "../form/ToggledInput";

export default class DDNSConfig extends React.Component<IConfigProps<IDDNSConfig>, {}> {
  constructor(props: IConfigProps<IDDNSConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="DDNS">
          <InputGroup<IDDNSConfig> onChange={this.props.onChange} source={this.props.config}>
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
}
