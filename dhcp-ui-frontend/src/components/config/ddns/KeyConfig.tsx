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

export interface IDeletableKeyConfigProps extends IDeletableConfigProps<IDNSSECKey> {
  keygenAvailable: boolean;
}

export function KeyConfig(keygenAvailable: boolean) {
  return DeletableConfig<IDNSSECKey>("key", props => {
    const generateKey = () => {
      API.post("/generatednssec", {
        algorithm: props.config.algorithm
      }).then(response => {
        const secret = response.data.secret;
        props.onChange("key", secret);
      });
    };

    return (<Card title={props.config.name}>
      <InputGroup<IDNSSECKey>
        onChange={props.onChange}
        config={props.config}>
        <TextInput label="Name" name="name" />
        <SelectInput<string> label="Algorithm" name="algorithm" options={DNSSECAlgorithm} />
        <TextInput label="Key" name="key">
          <div className="ml-3">
            <Button
              style={ButtonStyle.Info}
              onClick={generateKey}
              disabled={!keygenAvailable}>
              Generate
            </Button>
          </div>
        </TextInput>
      </InputGroup>
      <FormButton style={ButtonStyle.Danger} onClick={props.openDeleteModal}>
        Delete key
    </FormButton>
    </Card>);
  });
}