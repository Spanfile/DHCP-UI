import { IDNSSECKeys } from "common/config/ddns/IDDNSConfig";
import IDNSSECKey, { DNSSECAlgorithm } from "common/config/ddns/IDNSSECKey";
import IConfigProps from "common/config/IConfigProps";
import Button from "components/form/Button";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SelectInput from "components/form/SelectInput";
import TextInput from "components/form/TextInput";
import * as React from "react";

export default class KeyConfig extends React.Component<IConfigProps<IDNSSECKeys>, {}> {
  constructor(props: IConfigProps<IDNSSECKeys>) {
    super(props);
  }

  public render(): JSX.Element {
    const keyConfigs: JSX.Element[] = [];
    Object.entries(this.props.config).forEach(([id, key]) => {
      keyConfigs.push(
        <div key={id} className="col-sm-9">
          <Card title={key.name}>
            <InputGroup<IDNSSECKey>
              onChange={(name, value) => this.onInputChange(Number(id), name, value)}
              source={key}>
              <TextInput label="Name" name="name" />
              <SelectInput<string> label="Algorithm" name="algorithm" options={Object.values(DNSSECAlgorithm)} />
              <TextInput label="Key" name="key" />
            </InputGroup>
            <Button label="Delete key" style="danger" onClick={e => { return; }} />
          </Card>
        </div>);
    });

    return (
      <div className="row">
        <div className="col-sm-3">
          <button type="button" className="rounded-0 btn btn-success float-right">Add key</button>
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
}
