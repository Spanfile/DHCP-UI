import { IHost } from "common/config/IHostsConfig";
import { ButtonStyle } from "components/Button";
import { DeletableConfig } from "components/config/DeletableConfig";
import OptionsConfig from "components/config/options/OptionsConfig";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import AddressInput from "components/form/inputs/AddressInput";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";

export const HostConfig = DeletableConfig<IHost>("host", props => {
  const onOptionChanged = (id: number, value: any) => {
    const options = props.config.options;
    if (value == null) {
      delete options[id];
    } else {
      options[id] = value;
    }
    props.onChange("options", options);
  };

  return (
    <Card title={props.config.hostname}>
      <InputGroup<IHost>
        onChange={props.onChange}
        source={props.config}>
        <TextInput label="Host name" name="hostname" />
        <TextInput label="Hardware" name="hardware" />
        <AddressInput label="Fixed address" name="fixedAddress" />
        <TextInput label="DDNS hostname" name="ddnsHostname" />
      </InputGroup>
      <OptionsConfig
        config={props.config.options}
        onChange={onOptionChanged} />
      <div className="mt-3">
        <FormButton style={ButtonStyle.Danger} onClick={props.openDeleteModal}>
          Delete host
      </FormButton>
      </div>
    </Card>
  );
});