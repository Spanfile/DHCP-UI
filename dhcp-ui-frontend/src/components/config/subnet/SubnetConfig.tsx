import IConfigProps from "common/config/IConfigProps";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import { IDHCPSubnet } from "common/config/subnet/IDHCPSubnet";
import Button, { ButtonStyle } from "components/Button";
import OptionsConfig from "components/config/options/OptionsConfig";
import AddressRangeInput from "components/form/AddressRangeInput";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SubnetInput from "components/form/SubnetInput";
import * as React from "react";

export interface ISubnetConfigProps extends IConfigProps<IDHCPSubnet> {
  onDelete: () => void;
}

export default class SubnetConfig extends React.Component<ISubnetConfigProps, {}> {
  constructor(props: ISubnetConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Card title="Common">
          <InputGroup<IDHCPSubnet>
            onChange={this.props.onChange}
            source={this.props.config} >
            <SubnetInput label="Subnet" name="subnet" />
            <AddressRangeInput label="Range" name="range" />
          </InputGroup>
        </Card>
        <Card title="Options">
          <OptionsConfig config={this.props.config.options} onChange={this.onOptionsChanged} />
        </Card>
        <Button style={ButtonStyle.Danger} onClick={this.props.onDelete}>
          Delete subnet
        </Button>
      </div>
    );
  }

  private onOptionsChanged = (name: string, value: IOptionsConfig) => {
    const options = this.props.config.options;
    if (!value) {
      delete options[name];
    } else {
      options[name] = value;
    }
    this.props.onChange("options", options);
  }
}