import { DNSSECAlgorithm, IDNSSECKey } from "common/config/ddns/IDNSSECKey";
import IConfigProps from "common/config/IConfigProps";
import { ButtonStyle } from "components/Button";
import Card from "components/form/Card";
import FormButton from "components/form/FormButton";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";

export interface IKeyConfigProps extends IConfigProps<IDNSSECKey> {
  onDelete: () => void;
}

export default class KeyConfig extends React.Component<IKeyConfigProps, {}> {
  constructor(props: IKeyConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Card title={this.props.config.name}>
        <InputGroup<IDNSSECKey>
          onChange={this.props.onChange}
          source={this.props.config}>
          <TextInput label="Name" name="name" />
          <SelectInput<string> label="Algorithm" name="algorithm" options={Object.values(DNSSECAlgorithm)} />
          <TextInput label="Key" name="key" />
        </InputGroup>
        <FormButton style={ButtonStyle.Danger} onClick={this.props.onDelete}>
          Delete key
        </FormButton>
      </Card>
    );
  }
}