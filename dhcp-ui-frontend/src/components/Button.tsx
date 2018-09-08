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
  label: string;
  style: ButtonStyle;
  onClick: () => void;
}

export default class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <button
        type="button"
        className={"rounded-0 btn btn-" + this.props.style}
        onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}