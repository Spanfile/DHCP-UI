import { SortOrder } from "common/SortOrder";
import * as React from "react";

export interface ITableHeaderProps {
  header: string;
}

export interface ITableHeaderState {
  sorted: SortOrder;
}

export default class TableHeader extends React.Component<ITableHeaderProps, ITableHeaderState> {
  constructor(props: ITableHeaderProps) {
    super(props);

    this.state = {
      sorted: SortOrder.Unsorted
    };
  }

  public render() {
    return (
      <th key={this.props.header} scope="col">{this.props.header}</th>
    );
  }
}
