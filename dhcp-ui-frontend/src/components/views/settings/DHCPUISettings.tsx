import * as React from "react";
import Button from "./form-controls/Button";
import Card from "./form-controls/Card";
import TextInput from "./form-controls/TextInput";
import ToggledTextInput from "./form-controls/ToggledTextInput";

export interface IDHCPUISettingsProps {
  serviceName: string,
  configDir: string,
  logFile: string,
  logInJournal: boolean,
  leaseFile: string
}

export interface IDHCPUISettingsState {
  serviceName: string,
  configDir: string,
  logFile: string,
  logInJournal: boolean,
  leaseFile: string
}

export default class DHCPUISettings extends React.Component<IDHCPUISettingsProps, IDHCPUISettingsState> {
  constructor(props: IDHCPUISettingsProps) {
    super(props);

    this.state = {
      configDir: this.props.configDir,
      leaseFile: this.props.leaseFile,
      logFile: this.props.logFile,
      logInJournal: this.props.logInJournal,
      serviceName: this.props.serviceName,
    }
  }

  public render() {
    const inputChanged = this.inputChanged.bind(this);
    const save = this.save.bind(this);

    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <form>
          <Card title="DHCP service">
            <Button label="Detect automatically" style="success" onClick={this.detectDhcpServer} />
            <TextInput
              label="DHCP service name"
              name="serviceName"
              onChange={inputChanged}
              value={this.props.serviceName}
            />
            <TextInput
              label="Configuration directory"
              name="configDir"
              onChange={inputChanged}
              value={this.props.configDir}
            />
            <ToggledTextInput
              label="Log file"
              name="logFile"
              value={this.props.logFile}
              checkLabel="In journal"
              checkName="logInJournal"
              checkValue={this.props.logInJournal}
              onChange={inputChanged}
            />
            <TextInput
              label="Lease file"
              name="leaseFile"
              onChange={inputChanged}
              value={this.props.leaseFile}
            />
          </Card>
          <Button label="Save" style="primary" onClick={save} />
        </form>
      </div>
    );
  }

  private save(event: any) {
    console.log(this.state);
  }

  private inputChanged(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const state = {};
    state[name] = value;

    this.setState(state);
  }

  private detectDhcpServer(event: any) {
    console.log(event);
  }
}
