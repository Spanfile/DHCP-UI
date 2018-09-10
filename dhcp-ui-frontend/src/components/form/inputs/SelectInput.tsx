import IInputProps from "common/IInputProps";
import FormInputRow from "components/form/FormInputRow";
import * as React from "react";

export interface ISelectInputProps<T extends string | number> extends IInputProps<T> {
  options: T[];
}

export default class SelectInput<T extends string | number> extends React.Component<ISelectInputProps<T>, {}> {
  constructor(props: ISelectInputProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    const options = this.props.options.map(option =>
      <option key={option}>{option}</option>
    );

    return (
      <FormInputRow {...this.props}>
        <select
          className="custom-select rounded-0"
          name={this.props.name}
          value={this.props.value!}
          onChange={this.props.onChange}>
          {options}
        </select>
      </FormInputRow>
    );
  }
}
