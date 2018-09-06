import IInputProps from "common/IInputProps";
import * as React from "react";

export interface ICommonInputProps<T> extends IInputProps<T> {
  type: "text" | "number";
}

export default class CommonInput<T> extends React.Component<ICommonInputProps<T>, {}> {
  constructor(props: ICommonInputProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-9">
          <input
            type={this.props.type}
            className="form-control rounded-0"
            name={this.props.name}
            onChange={this.props.onChange} />
        </div>
      </div>
    );
  }
}
