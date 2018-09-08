import IConfigProps from "common/config/IConfigProps";
import IGlobalConfig from "common/config/IGlobalConfig";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import NumberInput from "components/form/NumberInput";
import ToggledInput from "components/form/ToggledInput";
import * as React from "react";
import OptionsConfig from "./options/OptionsConfig";

export default class GlobalConfig extends React.Component<IConfigProps<IGlobalConfig>, {}> {
  constructor(props: IConfigProps<IGlobalConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="Common">
          <InputGroup<IGlobalConfig> onChange={this.props.onChange} source={this.props.config}>
            <ToggledInput label="Authoritative" name="authoritative" />
            <NumberInput label="Default lease time" name="defaultLeaseTime" />
            <NumberInput label="Max. lease time" name="maxLeaseTime" />
          </InputGroup>
        </Card>
        <Card title="Options">
          <OptionsConfig config={this.props.config.options} onChange={this.onOptionsChanged} />
        </Card>
      </div>
    );
  }

  private onOptionsChanged = (name: string, value: IOptionsConfig) => {
    const options = this.props.config.options;
    if (!value) {
      delete options[name];
    } else {
      options[name] = value;
    }
    this.props.onChange("options", options);
  }
}
