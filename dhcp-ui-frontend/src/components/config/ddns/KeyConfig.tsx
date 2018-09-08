import { DNSSECAlgorithm, IDNSSECKey } from "common/config/ddns/IDNSSECKey";
import IConfigProps from "common/config/IConfigProps";
import { IModalState } from "common/IModal";
import { ButtonStyle } from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";

export interface IKeyConfigProps extends IConfigProps<IDNSSECKey> {
  onDelete: () => void;
}

export default class KeyConfig extends React.Component<IKeyConfigProps, IModalState> {
  constructor(props: IKeyConfigProps) {
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
          body="Are you sure you want to delete the key? This action cannot be undone!"
          header="Confirm key deletion"
          confirm="Yes, delete"
          onConfirm={this.props.onDelete}
          onClose={this.closeModal}
        />

        <Card title={this.props.config.name}>
          <InputGroup<IDNSSECKey>
            onChange={this.props.onChange}
            source={this.props.config}>
            <TextInput label="Name" name="name" />
            <SelectInput<string> label="Algorithm" name="algorithm" options={Object.values(DNSSECAlgorithm)} />
            <TextInput label="Key" name="key" />
          </InputGroup>
          <FormButton style={ButtonStyle.Danger} onClick={this.onDelete}>
            Delete key
          </FormButton>
        </Card>
      </div>
    );
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