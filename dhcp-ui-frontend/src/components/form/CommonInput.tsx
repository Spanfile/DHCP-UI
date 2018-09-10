import IInputProps from "common/IInputProps";
import FormInputRow from "components/form/FormInputRow";
import * as React from "react";

export interface ICommonInputProps<T extends string | number | string[]> extends IInputProps<T> {
  type: "text" | "number";
}

export default class CommonInput<T extends string | number | string[]> extends React.Component<ICommonInputProps<T>, {}> {
  constructor(props: ICommonInputProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <FormInputRow {...this.props}>
        <input
          type={this.props.type}
          className="form-control rounded-0"
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value!} />
      </FormInputRow>
    );
  }
}
