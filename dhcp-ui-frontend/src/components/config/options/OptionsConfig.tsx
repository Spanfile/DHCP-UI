import { IConfigProps } from "common/config/IConfigProps";
import { IOption, IOptionsConfig } from "common/config/IOptionsConfig";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import * as React from "react";
import OptionConfig from "./OptionConfig";

export default class OptionsConfig extends React.Component<IConfigProps<IOptionsConfig>, {}> {
  constructor(props: IConfigProps<IOptionsConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ConfigCollectionView<IOption>
        config={this.props.config}
        addButtonText="Add host"
        component={OptionConfig}
        onAdd={this.addOption}
        onChange={this.onOptionChange}
        onDelete={this.deleteOption} />
    );
  }

  private onOptionChange = (id: number, name: keyof IOption, value: any) => {
    const option = this.props.config[id];
    option[name] = value;
    this.props.onChange(id, option);
  }

  private addOption = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newOption = {
      name: "",
      expression: ""
    };
    this.props.onChange(newId, newOption);
  }

  private deleteOption = (id: number) => {
    this.props.onChange(id, null);
  }
}