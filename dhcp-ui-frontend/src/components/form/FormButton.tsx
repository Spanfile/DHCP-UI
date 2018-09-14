import Button, { IButtonProps } from "components/Button";
import * as React from "react";

export default class FormButton extends React.Component<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row" >
        <div className="col-sm-8 offset-sm-2">
          <Button {...this.props}>
            {this.props.children}
          </Button>
        </div>
      </div>
    );
  }
}
