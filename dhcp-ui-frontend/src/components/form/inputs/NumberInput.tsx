import IInputProps from "common/IInputProps";
import CommonInput from "components/form/CommonInput";
import * as React from "react";

export default class NumberInput extends React.Component<IInputProps<number>, {}> {
  constructor(props: IInputProps<number>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <CommonInput type="number" {...this.props} />
    );
  }
}
