import IGlobalConfig from "common/IGlobalConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import NumberInput from "components/form/NumberInput";
import TextInput from "components/form/TextInput";
import * as React from "react";
import ToggledInput from "../form/ToggledInput";

export default class GlobalConfig extends React.Component<IGlobalConfig, IGlobalConfig> {
  constructor(props: IGlobalConfig) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="Common">
          <InputGroup onChange={this.inputChanged}>
            <ToggledInput label="Authoritative" name="authoritative" />
            <NumberInput label="Default lease time" name="defaultLeaseTime" />
            <NumberInput label="Max. lease time" name="maxLeaseTime" />
            <TextInput label="Domain name" name="domainName" />
          </InputGroup>
        </Card>
      </div>
    );
  }

  private inputChanged = (name: string, value: any) => {
    const state = {};
    state[name] = value;

    console.log(state);
    this.setState(state);
  }
}
