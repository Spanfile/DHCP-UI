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
    return (
      <div className="card rounded-0 mb-3">
        <div className="card-body">
          <div className="border-bottom mb-3">
            <h5 className="card-title m-0">{this.props.title}</h5>
          </div>
          {this.state.open ? this.props.children : []}
        </div>
      </div >
    );
  }
}
