import IInputProps from "common/IInputProps";
import * as React from "react";

export default class ToggledInput extends React.Component<IInputProps<boolean>, {}> {
  constructor(props: IInputProps<boolean>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-9">
          <div className="form-check form-check-inline toggled-text-input-check">
            <input
              className="form-check-input"
              type="checkbox"
              name={this.props.name}
              onChange={this.props.onChange}
              checked={this.props.value!}
            />
          </div>
        </div>
      </div>
    );
  }
}
