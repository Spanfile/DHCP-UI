import IConfigProps from "common/config/IConfigProps";
import { IOption } from "common/config/IOptionsConfig";
import { IModalState } from "common/IModalState";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";
import * as Modal from "react-modal";

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
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}>
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title">Confirm removal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the option? This action cannot be undone!</p>
            </div>
            <div className="modal-footer">
              <Button style={ButtonStyle.Danger} onClick={this.props.onDelete}>
                Yes, delete
              </Button>
              <Button style={ButtonStyle.Secondary} onClick={this.closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        <div className="form-group">
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