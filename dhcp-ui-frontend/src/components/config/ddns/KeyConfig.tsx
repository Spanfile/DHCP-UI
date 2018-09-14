import API from "API";
import { DNSSECAlgorithm, IDNSSECKey } from "common/config/ddns/IDNSSECKey";
import IModalState from "common/IModalState";
import Button, { ButtonStyle } from "components/Button";
import { DeletableConfig, IDeletableConfigProps } from "components/config/DeletableConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import SaveFileModal from "components/modal/SaveFileModal";
import * as React from "react";

export interface IDeletableKeyConfigProps extends IDeletableConfigProps<IDNSSECKey> {
  keygenAvailable: boolean;
}

interface IDeletableKeyConfigState extends IModalState {
  exportFilename: string;
  exportContents: string;
}

export function KeyConfig(keygenAvailable: boolean) {
  return DeletableConfig("key",
    class DeletableKeyConfig extends React.Component<IDeletableKeyConfigProps, IDeletableKeyConfigState> {
      constructor(props: IDeletableKeyConfigProps) {
        super(props);

        this.state = {
          isModalOpen: false,
          exportFilename: "",
          exportContents: ""
        };
      }

      public render(): JSX.Element {
        return (
          <>
            <SaveFileModal
              isOpen={this.state.isModalOpen}
              filename={this.state.exportFilename}
              contents={this.state.exportContents}
              onConfirm={this.closeExportModal}
              onClose={this.closeExportModal} />

            <Card title={this.props.config.name}>
              <InputGroup<IDNSSECKey>
                onChange={this.props.onChange}
                config={this.props.config}>
                <TextInput label="Name" name="name" />
                <SelectInput<string> label="Algorithm" name="algorithm" options={DNSSECAlgorithm} />
                <TextInput label="Key" name="key">
                  <div className="ml-3">
                    <Button
                      style={ButtonStyle.Info}
                      onClick={this.generateKey}
                      disabled={!keygenAvailable}>
                      Generate
                    </Button>
                  </div>
                </TextInput>
              </InputGroup>
              <div className="form-group row">
                <div className="col-sm-8 offset-sm-2">
                  <div className="d-flex flex-row">
                    <div className="mr-3">
                      <Button style={ButtonStyle.Danger} onClick={this.props.openDeleteModal}>
                        Delete key
                    </Button>
                    </div>
                    <Button style={ButtonStyle.Primary} onClick={this.openExportModal}>
                      Export key
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </>
        );
      }

      private readonly generateKey = () => {
        API.post("/generatednssec", {
          algorithm: this.props.config.algorithm
        }).then(response => {
          const secret = response.data.secret;
          this.props.onChange("key", secret);
        });
      }

      private readonly openExportModal = () => {
        const config = this.props.config;
        const key = "key \"" + config.name +
          "\" {\n\talgorithm " + config.algorithm.toLowerCase() + ";\n" +
          "\tsecret \"" + config.key + "\";\n};";

        this.setState({
          isModalOpen: true,
          exportFilename: config.name,
          exportContents: key
        });
      }

      private readonly closeExportModal = () => {
        this.setState({
          isModalOpen: false
        });
      }
    });
}
