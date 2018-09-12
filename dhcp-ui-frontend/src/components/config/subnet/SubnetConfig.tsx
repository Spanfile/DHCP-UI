import { ICollectionConfigProps } from "common/config/IConfigProps";
import { IDHCPSubnet } from "common/config/subnet/IDHCPSubnet";
import { IModalState } from "common/IModal";
import Button, { ButtonStyle } from "components/Button";
import HostsConfig from "components/config/hosts/HostsConfig";
import OptionsConfig from "components/config/options/OptionsConfig";
import ConfirmModal from "components/ConfirmModal";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import AddressRangeInput from "components/form/inputs/AddressRangeInput";
import SubnetInput from "components/form/inputs/SubnetInput";
import * as React from "react";

export default class SubnetConfig extends React.Component<ICollectionConfigProps<IDHCPSubnet>, IModalState> {
  constructor(props: ICollectionConfigProps<IDHCPSubnet>) {
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
          <OptionsConfig
            config={this.props.config.options}
            onChange={(name, value) => this.onConfigChanged("options", name, value)}
          />
        </Card>
        <Card title="Hosts">
          <HostsConfig
            config={this.props.config.hosts}
            onChange={(name, value) => this.onConfigChanged("hosts", name, value)}
          />
        </Card>
        <Button style={ButtonStyle.Danger} onClick={this.onDelete}>
          Delete subnet
        </Button>
      </div>
    );
  }

  private onConfigChanged = (config: keyof IDHCPSubnet, name: number, value: any) => {
    const conf = this.props.config[config];
    if (value == null) {
      delete conf[name];
    } else {
      conf[name] = value;
    }
    this.props.onChange(config, conf);
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