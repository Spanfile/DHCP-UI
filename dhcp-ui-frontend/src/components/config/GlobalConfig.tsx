import IConfigProps from "common/config/IConfigProps";
import IGlobalConfig from "common/config/IGlobalConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import NumberInput from "components/form/NumberInput";
import * as React from "react";
import ToggledInput from "../form/ToggledInput";

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
          <div />
        </Card>
      </div>
    );
  }
}
