import IDHCPSubnet from "common/subnet/IDHCPSubnet";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SubnetInput from "components/form/SubnetInput";
import TextInput from "components/form/TextInput";
import * as React from "react";

export interface ISubnetConfigProps extends IDHCPSubnet {
  onChange: (id: number, dhcpSubnet: IDHCPSubnet) => void;
}

export default class SubnetConfig extends React.Component<ISubnetConfigProps, {}> {
  constructor(props: ISubnetConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Card title="Common">
          <InputGroup<IDHCPSubnet> onChange={this.inputChanged} source={this.props} >
            <SubnetInput label="Subnet" name="subnet" />
            <TextInput label="Routers" name="routers" />
            <TextInput label="NTP-servers" name="ntpServers" />
          </InputGroup>
        </Card>
      </div>
    );
  }

  private inputChanged = (name: string, value: any) => {
    const copyProps = { ...this.props };
    copyProps[name] = value;
    this.props.onChange(this.props.id, copyProps);
  }
}
