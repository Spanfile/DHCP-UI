import API from "API";
import { DNSSECAlgorithm, IDNSSECKey } from "common/config/ddns/IDNSSECKey";
import Button, { ButtonStyle } from "components/Button";
import { DeletableConfig, IDeletableConfigProps } from "components/config/DeletableConfig";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";

interface IDeletableKeyConfigState {
  keygenAvailable: boolean;
}

class DeletableKeyConfig extends React.Component<IDeletableConfigProps<IDNSSECKey>, IDeletableKeyConfigState> {
  constructor(props: IDeletableConfigProps<IDNSSECKey>) {
    super(props);

    this.state = {
      keygenAvailable: false
    };
  }

  public componentDidMount() {
    API.get("/generatednssec").then(response => {
      this.setState({
        keygenAvailable: response.data.available
      });
    });
  }

  public render() {
    return (<Card title={this.props.config.name}>
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
              disabled={!this.state.keygenAvailable}>
              Generate
            </Button>
          </div>
        </TextInput>
      </InputGroup>
      <FormButton style={ButtonStyle.Danger} onClick={this.props.openDeleteModal}>
        Delete key
    </FormButton>
    </Card>);
  }

  private generateKey = () => {
    API.post("/generatednssec", {
      algorithm: this.props.config.algorithm
    }).then(response => {
      const secret = response.data.secret;
      this.props.onChange("key", secret);
    });
  }
}

export const KeyConfig = DeletableConfig<IDNSSECKey>("key", DeletableKeyConfig);