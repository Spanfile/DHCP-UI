import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

export interface IIconButtonProps {
  icon: IconProp;
  onClick: () => void;
  disabled?: boolean;
}

export default class IconButton extends React.Component<IIconButtonProps> {
  constructor(props: IIconButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <button
        type="button"
        className="rounded-0 btn"
        style={{ backgroundColor: "transparent" }}
        onClick={this.props.onClick}
        disabled={this.props.disabled}>
        <FontAwesomeIcon icon={this.props.icon} />
      </button>
    );
  }
}