import DHCPSubnet from "common/subnet/DHCPSubnet";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import TextInput from "components/form/TextInput";
import * as React from "react";

export interface ISubnetConfigProps {
  subnet: DHCPSubnet;
}

export default class SubnetConfig extends React.Component<ISubnetConfigProps, {}> {
  constructor(props: ISubnetConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Card title="Common">
          <InputGroup onChange={this.inputChanged}>
            <TextInput label="Subnet" name="subnet" />
            <TextInput label="Routers" name="routers" />
            <TextInput label="NTP-servers" name="ntpServers" />
          </InputGroup>
        </Card>
      </div>
    );
  }

  private inputChanged = (name: string, value: any) => {
    const state = {};
    state[name] = value;

    this.setState(state);
  }
}
