import IConfigProps from "common/config/IConfigProps";
import { IHost } from "common/config/IHostsConfig";
import { IModalState } from "common/IModal";
import { ButtonStyle } from "components/Button";
import OptionsConfig from "components/config/options/OptionsConfig";
import ConfirmModal from "components/ConfirmModal";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import AddressInput from "components/form/inputs/AddressInput";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";

export interface IHostConfigProps extends IConfigProps<IHost> {
  onDelete: () => void;
}

export default class HostConfig extends React.Component<IHostConfigProps, IModalState> {
  constructor(props: IHostConfigProps) {
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
          body="Are you sure you want to delete the host? This action cannot be undone!"
          header="Confirm host deletion"
          confirm="Yes, delete"
          onConfirm={this.props.onDelete}
          onClose={this.closeModal}
        />

        <Card title={this.props.config.hostname}>
          <InputGroup<IHost>
            onChange={this.props.onChange}
            source={this.props.config}>
            <TextInput label="Host name" name="hostname" />
            <TextInput label="Hardware" name="hardware" />
            <AddressInput label="Fixed address" name="fixedAddress" />
            <TextInput label="DDNS hostname" name="ddnsHostname" />
          </InputGroup>
          <OptionsConfig
            config={this.props.config.options}
            onChange={this.onOptionChanged}
          />
          <div className="mt-3">
            <FormButton style={ButtonStyle.Danger} onClick={this.onDelete}>
              Delete host
            </FormButton>
          </div>
        </Card>
      </div>
    );
  }

  private onOptionChanged = (name: string, value: any) => {
    const options = this.props.config.options;
    if (value == null) {
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