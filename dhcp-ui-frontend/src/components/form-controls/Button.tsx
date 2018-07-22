import * as React from "react";

export interface IButtonProps {
  label: string,
  style: string,
  onClick: (event: any) => void,
}

export default class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    const label = this.props.label;
    const style = this.props.style;
    const onClick = this.props.onClick;

    return (
      <div className="form-group row" >
        <div className="col-sm-8 offset-sm-4">
          <button type="button" className={"rounded-0 btn btn-" + style} onClick={onClick}>{label}</button>
        </div>
      </div>
    );
  }
}
