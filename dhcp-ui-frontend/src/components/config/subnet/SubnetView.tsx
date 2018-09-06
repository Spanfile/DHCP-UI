import IDHCPSubnet from "common/subnet/IDHCPSubnet";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import SubnetConfig from "./SubnetConfig";

export interface ISubnetViewProps {
  subnets: {
    [id: number]: IDHCPSubnet
  };
  onChange: (id: number, dhcpSubnet: IDHCPSubnet) => void;
}

export default class SubnetView extends React.Component<ISubnetViewProps, {}> {
  constructor(props: ISubnetViewProps) {
    super(props);
  }

  public render(): JSX.Element {
    let firstSubnetId: any = null;
    const subnetRoutes: JSX.Element[] = [];
    Object.entries(this.props.subnets).forEach(([id, subnet]) => {
      if (!firstSubnetId) {
        firstSubnetId = id;
      }

      subnetRoutes.push(<Route key={id} path={"/config/subnets/" + id} render={
        // tslint:disable-next-line:jsx-no-lambda
        () => <SubnetConfig {...subnet} onChange={this.props.onChange} />} />);
    });

    return (
      <Switch>
        <Redirect exact={true} from="/config/subnets" to={"/config/subnets/" + firstSubnetId} />
        {subnetRoutes}
      </Switch>
    );
  }
}
