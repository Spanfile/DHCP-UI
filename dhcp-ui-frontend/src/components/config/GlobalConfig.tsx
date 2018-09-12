import { IConfigProps } from "common/config/IConfigProps";
import IGlobalConfig from "common/config/IGlobalConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import TimeSpanInput from "components/form/inputs/TimeSpanInput";
import ToggledInput from "components/form/inputs/ToggledInput";
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
          <div className="pb-3">
            <InputGroup<IGlobalConfig> onChange={this.props.onChange} source={this.props.config}>
              <ToggledInput label="Authoritative" name="authoritative" />
              <TimeSpanInput label="Default lease time" name="defaultLeaseTime" />
              <TimeSpanInput label="Max. lease time" name="maxLeaseTime" />
            </InputGroup>
          </div>
        </Card>
        <Card title="Options">
          <OptionsConfig
            config={this.props.config.options}
            onChange={(name, value) => this.onConfigChanged("options", name, value)} />
        </Card>
      </div>
    );
  }

  private onConfigChanged = (config: keyof IGlobalConfig, name: number, value: any) => {
    const conf = this.props.config[config];
    if (value == null) {
      delete conf[name];
    } else {
      conf[name] = value;
    }
    this.props.onChange(config, conf);
  }
}
