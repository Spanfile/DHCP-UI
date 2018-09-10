import { IDDNSZone } from "common/config/ddns/IDDNSZone";
import IConfigProps from "common/config/IConfigProps";
import { IModalState } from "common/IModal";
import { ButtonStyle } from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";

export interface IZoneConfigProps extends IConfigProps<IDDNSZone> {
  dnssecKeys: string[];
  onDelete: () => void;
}

export default class ZoneConfig extends React.Component<IZoneConfigProps, IModalState> {
  constructor(props: IZoneConfigProps) {
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
          body="Are you sure you want to delete the zone? This action cannot be undone!"
          header="Confirm zone deletion"
          confirm="Yes, delete"
          onConfirm={this.props.onDelete}
          onClose={this.closeModal}
        />

        <Card title={this.props.config.domain}>
          <InputGroup<IDDNSZone>
            onChange={this.props.onChange}
            source={this.props.config}>
            <TextInput label="Domain" name="domain" />
            <TextInput label="Primary NS" name="primary" />
            <SelectInput label="DNSSEC key" name="key" options={this.props.dnssecKeys} />
          </InputGroup>
          <FormButton style={ButtonStyle.Danger} onClick={this.onDelete}>
            Delete zone
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