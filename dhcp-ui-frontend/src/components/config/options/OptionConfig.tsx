import { ICollectionConfigProps } from "common/config/IConfigProps";
import { IOption } from "common/config/IOptionsConfig";
import { IModalState } from "common/IModal";
import Button, { ButtonStyle } from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import * as React from "react";

export default class OptionConfig extends React.Component<ICollectionConfigProps<IOption>, IModalState> {
  constructor(props: ICollectionConfigProps<IOption>) {
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

        <div className="form-row pb-3 m-0">
          <div className="col-sm-5">
            <label className="col-form-label">
              Option
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              onChange={(event) => this.props.onChange("name", event.target.value)}
              value={this.props.config.name} />
          </div>
          <div className="col-sm-5">
            <label className="col-form-label">
              Expression
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              onChange={(event) => this.props.onChange("expression", event.target.value)}
              value={this.props.config.expression} />
          </div>
          <div className="col-sm-2" style={{ paddingTop: "38px" }}>
            <div className="float-right">
              <Button style={ButtonStyle.Danger} onClick={this.onDelete}>
                Delete
              </Button>
            </div>
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