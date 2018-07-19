import { AxiosResponse } from "axios";
import * as React from "react";
import API from "../../../API";
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
    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <Card title="DHCP service">
          <Button label="Detect automatically" style="success" onClick={this.detectDhcpServer} />
          <TextInput
            label="DHCP service name"
            name="serviceName"
            onChange={this.inputChanged}
            value={this.state.serviceName}
          />
          <TextInput
            label="Configuration directory"
            name="configDir"
            onChange={this.inputChanged}
            value={this.state.configDir}
          />
          <ToggledTextInput
            label="Log file"
            name="logFile"
            value={this.state.logFile}
            checkLabel="In journal"
            checkName="logInJournal"
            checkValue={this.state.logInJournal}
            onChange={this.inputChanged}
          />
          <TextInput
            label="Lease file"
            name="leaseFile"
            onChange={this.inputChanged}
            value={this.state.leaseFile}
          />
        </Card>
      </div>
    );
  }

  private inputChanged = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const state = {};
    state[name] = value;

    this.setState(state);
  }

  private detectDhcpServer = (event: any) => {
    API.get("/detectdhcpserver")
      .then((response: AxiosResponse) => {
        const data = response.data;
        this.setState(data);
      });
  }
}
