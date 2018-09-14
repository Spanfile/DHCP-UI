import { DNSSECAlgorithm, IDNSSECKey } from "common/config/ddns/IDNSSECKey";
import { ButtonStyle } from "components/Button";
import { DeletableConfig } from "components/config/DeletableConfig";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/inputs/SelectInput";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";

export const KeyConfig = DeletableConfig<IDNSSECKey>("key", props =>
  <Card title={props.config.name}>
    <InputGroup<IDNSSECKey>
      onChange={props.onChange}
      config={props.config}>
      <TextInput label="Name" name="name" />
      <SelectInput<string> label="Algorithm" name="algorithm" options={Object.values(DNSSECAlgorithm)} />
      <TextInput label="Key" name="key" />
    </InputGroup>
    <FormButton style={ButtonStyle.Danger} onClick={props.openDeleteModal}>
      Delete key
    </FormButton>
  </Card>);