import IConfigProps from "common/config/IConfigProps";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";
import OptionConfig from "./OptionConfig";

export default class OptionsConfig extends React.Component<IConfigProps<IOptionsConfig>, {}> {
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    const optionConfigs: JSX.Element[] = [];
    const keys = Object.keys(this.props.config);
    const lastId = keys[keys.length - 1];
    let skippedFirst = false;

    Object.entries(this.props.config).forEach(([id, key]) => {
      let wrapperClass = "col-sm-8";
      if (!skippedFirst) {
        skippedFirst = true;
      } else {
        wrapperClass += " offset-sm-2";
      }

      if (id !== lastId) {
        wrapperClass += " border-bottom";
      }

      optionConfigs.push(
        <div key={id} className={wrapperClass}>
          <OptionConfig
            config={key}
            onChange={(name, value) => this.onOptionChange(Number(id), name, value)}
            onDelete={() => this.deleteOption(Number(id))}
          />
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="float-right">
            <Button style={ButtonStyle.Success} onClick={this.addOption}>
              Add option
            </Button>
          </div>
        </div>
        {optionConfigs}
      </div>
    );
  }

  private onOptionChange = (id: number, name: string, value: any) => {
    const option = this.props.config[id];
    option[name] = value;
    this.props.onChange(id.toString(), option);
  }

  private addOption = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newOption = {
      name: "",
      expression: ""
    };
    this.props.onChange(newId.toString(), newOption);
  }

  private deleteOption = (id: number) => {
    this.props.onChange(id.toString(), null);
  }
}