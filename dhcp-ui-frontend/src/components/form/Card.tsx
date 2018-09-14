import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/IconButton";
import * as React from "react";

export interface ICardProps {
  title: string;
}

export interface ICardState {
  open: boolean;
}

export default class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);

    this.state = {
      open: true
    };
  }

  public render(): JSX.Element {
    const icon = this.state.open ? faChevronUp : faChevronDown;

    return (
      <div className="card rounded-0 mb-3">
        <div className="card-body pb-0">
          <div className="border-bottom mb-3">
            <div className="d-flex flex-row align-items-center">
              <IconButton onClick={this.toggleOpen} icon={icon} />
              <h5 className="card-title m-0">{this.props.title}</h5>
            </div>
          </div>
          {this.state.open ? this.props.children : []}
        </div>
      </div >
    );
  }

  private readonly toggleOpen = () => {
    this.setState({
      open: !this.state.open
    });
  }
}
