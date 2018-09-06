import IDHCPUISettings from "common/settings/IDHCPUISettings";
import Card from "components/form/Card";
import TextInput from "components/form/TextInput";
// import ToggledTextInput from "components/form/ToggledTextInput";
import * as React from "react";
import InputGroup from "../form/InputGroup";

export default class DHCPUISettings extends React.Component<IDHCPUISettings, IDHCPUISettings> {
  constructor(props: IDHCPUISettings) {
    super(props);

    this.state = {
      configDir: this.props.configDir || "",
      leaseFile: this.props.leaseFile || "",
      logFile: this.props.logFile || "",
      logInJournal: this.props.logInJournal || false,
      serviceName: this.props.serviceName || "",
    };
  }

  public render(): JSX.Element {
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="DHCP service">
          <InputGroup onChange={this.inputChanged} source={this.props} >
            <TextInput
              label="DHCP service name"
              name="serviceName"
            />
            <TextInput
              label="Configuration directory"
              name="configDir"
            />
            {/* <ToggledTextInput
              label="Log file"
              name="logFile"
              checkLabel="In journal"
              checkName="logInJournal"
            /> */}
            <TextInput
              label="Lease file"
              name="leaseFile"
            />
          </InputGroup>
        </Card>
      </div>
    );
  }

  private inputChanged = (name: string, value: any) => {
    const state = {};
    state[name] = value;

    this.setState(state);
  }
}
