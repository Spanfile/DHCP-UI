import IConfigProps from "common/config/IConfigProps";
import { IOption } from "common/config/IOptionsConfig";
import { IModalState } from "common/IModal";
import Button, { ButtonStyle } from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import * as React from "react";

export interface IOptionConfigProps extends IConfigProps<IOption> {
  onDelete: () => void;
}

export default class OptionConfig extends React.Component<IOptionConfigProps, IModalState> {
  constructor(props: IOptionConfigProps) {
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
          body="Are you sure you want to delete the option? This action cannot be undone!"
          header="Confirm option deletion"
          confirm="Yes, delete"
          onConfirm={this.props.onDelete}
          onClose={this.closeModal}
        />

        <div className="form-group p-0 m-0">
          <label className="col-form-label float-left mr-3">
            Option
          </label>
          <input
            type="text"
            className="form-control rounded-0 float-left"
            style={{ maxWidth: "16em" }}
            onChange={(event) => this.props.onChange("name", event.target.value)}
            value={this.props.config.name} />
          <label className="col-form-label float-left mr-3 ml-5">
            Expression
          </label>
          <input
            type="text"
            className="form-control rounded-0 float-left"
            style={{ maxWidth: "16em" }}
            onChange={(event) => this.props.onChange("expression", event.target.value)}
            value={this.props.config.expression} />
          <div className="float-right">
            <Button style={ButtonStyle.Danger} onClick={this.onDelete}>
              Delete
            </Button>
          </div>
        </div>
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