import * as React from "react";

export interface IButtonProps {
  label: string;
  style: string;
  onClick: (event: any) => void;
}

export default class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row" >
        <div className="col-sm-9 offset-sm-3">
          <button
            type="button"
            className={"rounded-0 btn btn-" + this.props.style}
            onClick={this.props.onClick}>
            {this.props.label}
          </button>
        </div>
      </div>
    );
  }
}
