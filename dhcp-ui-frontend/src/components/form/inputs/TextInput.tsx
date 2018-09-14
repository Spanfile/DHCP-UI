import IInputProps from "common/IInputProps";
import CommonInput from "components/form/CommonInput";
import * as React from "react";

export default class TextInput extends React.Component<IInputProps<string>> {
  constructor(props: IInputProps<string>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <CommonInput type="text" {...this.props} />
    );
  }
}
