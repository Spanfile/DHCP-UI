import IConfigProps from "common/config/IConfigProps";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import { IDHCPSubnet } from "common/config/subnet/IDHCPSubnet";
import { IModalState } from "common/IModal";
import Button, { ButtonStyle } from "components/Button";
import OptionsConfig from "components/config/options/OptionsConfig";
import ConfirmModal from "components/ConfirmModal";
import AddressRangeInput from "components/form/AddressRangeInput";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SubnetInput from "components/form/SubnetInput";
import * as React from "react";

export interface ISubnetConfigProps extends IConfigProps<IDHCPSubnet> {
  onDelete: () => void;
}

export default class SubnetConfig extends React.Component<ISubnetConfigProps, IModalState> {
  constructor(props: ISubnetConfigProps) {
    super(props);

    this.state = {
      isModalOpen: false
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <ConfirmModal
          isOpen={this.state.isModalOpen}
          body="Are you sure you want to delete the subnet? This action cannot be undone!"
          header="Confirm subnet deletion"
          confirm="Yes, delete"
          onConfirm={this.props.onDelete}
          onClose={this.closeModal}
        />

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
        <Button style={ButtonStyle.Danger} onClick={this.onDelete}>
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

  private onDelete = () => {
    this.setState({
      isModalOpen: true
    });
  }

  private closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  }
}