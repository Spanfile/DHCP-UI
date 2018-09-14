import IConfigProps, { handleConfigChange } from "common/config/IConfigProps";
import IGlobalConfig, { ICommonGlobalConfig } from "common/config/IGlobalConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import TimeSpanInput from "components/form/inputs/TimeSpanInput";
import ToggledInput from "components/form/inputs/ToggledInput";
import * as React from "react";
import OptionsConfig from "./options/OptionsConfig";

export default class GlobalConfig extends React.Component<IConfigProps<IGlobalConfig>> {
  constructor(props: IConfigProps<IGlobalConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <>
        <Card title="Common">
          <InputGroup<ICommonGlobalConfig>
            config={this.props.config.common}
            onChange={handleConfigChange("common", this.props)}>
            <ToggledInput label="Authoritative" name="authoritative" />
            <TimeSpanInput label="Default lease time" name="defaultLeaseTime" />
            <TimeSpanInput label="Max. lease time" name="maxLeaseTime" />
          </InputGroup>
        </Card>
        <Card title="Options">
          <OptionsConfig
            config={this.props.config.options}
            onChange={handleConfigChange("options", this.props)} />
        </Card>
      </>
    );
  }
}
