import { IDNSSECKeys } from "common/config/ddns/IDDNSConfig";
import IDNSSECKey, { DNSSECAlgorithm } from "common/config/ddns/IDNSSECKey";
import IConfigProps from "common/config/IConfigProps";
import Button, { ButtonStyle } from "components/Button";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";
import FormButton from "../../form/FormButton";

export default class KeyConfig extends React.Component<IConfigProps<IDNSSECKeys>, {}> {
  constructor(props: IConfigProps<IDNSSECKeys>) {
    super(props);
  }

  public render(): JSX.Element {
    const keyConfigs: JSX.Element[] = [];
    let skippedFirst = false;

    Object.entries(this.props.config).forEach(([id, key]) => {
      let colClass = "col-sm-9";
      if (!skippedFirst) {
        skippedFirst = true;
      } else {
        colClass += " offset-sm-3";
      }

      keyConfigs.push(
        <div key={id} className={colClass}>
          <Card title={key.name}>
            <InputGroup<IDNSSECKey>
              onChange={(name, value) => this.onInputChange(Number(id), name, value)}
              source={key}>
              <TextInput label="Name" name="name" />
              <SelectInput<string> label="Algorithm" name="algorithm" options={Object.values(DNSSECAlgorithm)} />
              <TextInput label="Key" name="key" />
            </InputGroup>
            <FormButton label="Delete key" style={ButtonStyle.Danger} onClick={() => this.deleteKey(Number(id))} />
          </Card>
        </div>);
    });

    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="float-right">
            <Button label="Add key" style={ButtonStyle.Success} onClick={this.addKey} />
          </div>
        </div>
        {keyConfigs}
      </div>
    );
  }

  private onInputChange = (id: number, name: string, value: any) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id.toString(), key);
  }

  private addKey = () => {
    return;
  }

  private deleteKey = (id: number) => {
    return;
  }
}
