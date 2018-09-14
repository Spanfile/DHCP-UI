import * as React from "react";

export enum ButtonStyle {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Light = "light",
  Dark = "dark",
  Link = "link"
}

export interface IButtonProps {
  style: ButtonStyle;
  onClick: () => void;
  disabled?: boolean;
}

export default class Button extends React.Component<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <button
        type="button"
        className={"rounded-0 btn btn-" + this.props.style}
        onClick={this.props.onClick}
        disabled={this.props.disabled}>
        {this.props.children}
      </button>
    );
  }
}