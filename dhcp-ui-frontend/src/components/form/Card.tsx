import * as React from "react";

export interface ICardProps {
  title: string;
}

export default class Card extends React.Component<ICardProps, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const title = this.props.title;
    const children = this.props.children;

    return (
      <div className="card rounded-0" style={{ marginBottom: "1em" }}>
        <div className="card-body">
          <h5 className="card-title border-bottom" style={{ marginBottom: "1.5em" }}>{title}</h5>
          {children}
        </div>
      </div >
    );
  }
}
