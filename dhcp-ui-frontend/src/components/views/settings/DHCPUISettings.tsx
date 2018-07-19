import * as React from "react";
import Button from "./form-controls/Button";
import Card from "./form-controls/Card";
import TextInput from "./form-controls/TextInput";

export interface IDHCPUISettingsProps {
  dhcp: {
    serviceName: string,
    configDir: string,
    logFile: string,
    leaseFile: string,
  }
}

export interface IDHCPUISettingsState {
  [dhcp: string]: string,
}

export default class DHCPUISettings extends React.Component<IDHCPUISettingsProps, IDHCPUISettingsState> {
  constructor(props: IDHCPUISettingsProps) {
    super(props);
  }

  public render() {
    const inputChanged = this.inputChanged.bind(this);
    const save = this.save.bind(this);

    return (
      <div className="tab-pane fade show active settings-tab" role="tabpanel">
        <form>
          <Card title="DHCP service">
            <Button label="Detect automatically" style="success" onClick={this.detectDhcpServer} />
            <TextInput label="DHCP service name" name="dhcp.serviceName" onChange={inputChanged} />
            <TextInput label="Configuration directory" name="dhcp.configDir" onChange={inputChanged} />
            <TextInput label="Log file" name="dhcp.logFile" onChange={inputChanged} />
            <TextInput label="Lease file" name="dhcp.leaseFile" onChange={inputChanged} />
          </Card>
          <Button label="Save" style="primary" onClick={save} />
        </form>
      </div>
    );
  }

  private save(event: any) {
    console.log(event);
  }

  private inputChanged(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const state = {};
    state[name] = value;
    console.log(state);

    this.setState(state);
  }

  private detectDhcpServer(event: any) {
    console.log(event);
  }
}
