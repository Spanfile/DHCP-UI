import IConfigProps, { ValueOf } from "common/config/IConfigProps";
import { IOptionConfig, IOptionsConfig } from "common/config/IOptionsConfig";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import * as React from "react";
import { OptionConfig } from "./OptionConfig";

export default class OptionsConfig extends React.Component<IConfigProps<IOptionsConfig>> {
  constructor(props: IConfigProps<IOptionsConfig>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ConfigCollectionView<IOptionConfig>
        config={this.props.config}
        addButtonText="Add option"
        component={OptionConfig}
        onAdd={this.addOption}
        onChange={this.onOptionChange}
        onDelete={this.deleteOption} />
    );
  }

  private readonly onOptionChange = (id: number, name: keyof IOptionConfig, value: ValueOf<IOptionConfig>) => {
    const option = this.props.config[id];
    option[name] = value;
    this.props.onChange(id, option);
  }

  private readonly addOption = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newOption = {
      name: "",
      expression: ""
    };
    this.props.onChange(newId, newOption);
  }

  private readonly deleteOption = (id: number) => {
    this.props.onChange(id, undefined);
  }
}
