import { IModalProps } from "common/IModal";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";
import * as Modal from "react-modal";

export default class ConfirmModal extends React.Component<IModalProps> {
  constructor(props: IModalProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}>
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h5 className="modal-title">{this.props.header}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{this.props.body}</p>
          </div>
          <div className="modal-footer">
            <Button style={ButtonStyle.Danger} onClick={this.props.onConfirm}>
              {this.props.confirm}
            </Button>
            <Button style={ButtonStyle.Secondary} onClick={this.props.onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}