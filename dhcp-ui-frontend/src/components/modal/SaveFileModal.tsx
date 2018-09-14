import Button, { ButtonStyle } from "components/Button";
import * as copy from "copy-to-clipboard";
import { saveAs } from "file-saver";
import * as React from "react";
import * as Modal from "react-modal";

export interface ISaveFileModalProps {
  isOpen: boolean;
  filename: string;
  contents: string;
  onConfirm: () => void;
  onClose: () => void;
}

interface ISaveFileModalState {
  copied: false;
}

export default class SaveFileModal extends React.Component<ISaveFileModalProps, ISaveFileModalState> {
  constructor(props: ISaveFileModalProps) {
    super(props);

    this.state = {
      copied: false
    };
  }

  public render(): JSX.Element {
    return (
      <Modal
        className="modal-dialog modal-lg"
        closeTimeoutMS={150}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}>
        <div className="modal-content rounded-0">
          <form>
            <div className="modal-header">
              <h5 className="modal-title">{this.props.filename}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows={5}
                  value={this.props.contents}
                  readOnly={true}
                  style={{
                    whiteSpace: "pre",
                    overflowWrap: "normal",
                    overflowX: "scroll"
                  }} />
              </div>
            </div>
            <div className="modal-footer">
              <Button style={ButtonStyle.Primary} onClick={this.onSaveAs}>
                Save as
              </Button>
              <Button style={ButtonStyle.Info} onClick={this.copyToClipboard}>
                Copy to clipboard
              </Button>
              <Button style={ButtonStyle.Secondary} onClick={this.props.onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  private onSaveAs = () => {
    saveAs(new Blob([this.props.contents], {
      type: "text/plain;charset=utf-8"
    }), this.props.filename + ".key");
    this.props.onConfirm();
  }

  private copyToClipboard = () => {
    copy(this.props.contents);
  }
}