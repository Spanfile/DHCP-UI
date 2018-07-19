import * as React from "react";

export interface ICardProps {
  title: string
}

export default class Card extends React.Component<ICardProps, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    const title = this.props.title;
    const children = this.props.children;

    return (
      <div className="card rounded-0">
        <div className="card-body">
          <h5 className="card-title border-bottom">{title}</h5>
          {children}
        </div>
      </div>
    );
  }
}
