import * as React from "react";

export interface IFormInputRowProps {
  label: string;
  innerRow?: boolean;
}

export default class FormInputRow extends React.Component<IFormInputRowProps> {
  constructor(props: IFormInputRowProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row align-items-center">
        <label className="col-sm-2 col-form-label text-right p-0">{this.props.label}</label>
        <div className={"col-sm-10" + (this.props.innerRow ? " form-row" : "")}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
