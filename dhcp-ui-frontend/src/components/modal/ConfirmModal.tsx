import Button, { ButtonStyle } from "components/Button";
import * as React from "react";
import * as Modal from "react-modal";

export interface IConfirmModalProps {
  isOpen: boolean;
  header: string;
  confirm: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default class ConfirmModal extends React.Component<IConfirmModalProps> {
  constructor(props: IConfirmModalProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Modal
        className="modal-dialog"
        closeTimeoutMS={150}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}>
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h5 className="modal-title">{this.props.header}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={this.props.onClose} >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {this.props.children}
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
