import IInputProps from "common/IInputProps";
import * as React from "react";

export default class ToggledInput extends React.Component<IInputProps<boolean>, {}> {
  constructor(props: IInputProps<boolean>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <div className="col-sm-8 offset-sm-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name={this.props.name}
              onChange={this.props.onChange}
              checked={this.props.value!}
              id={this.props.name}
            />
            <label className="form-check-label" htmlFor={this.props.name}>
              {this.props.label}
            </label>
          </div>
        </div>
      </div>
    );
  }
}
