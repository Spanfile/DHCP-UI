import DHCPSubnet from "common/subnet/DHCPSubnet";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import SubnetConfig from "./SubnetConfig";

export interface ISubnetViewProps {
  subnets: DHCPSubnet[];
}

export default class SubnetView extends React.Component<ISubnetViewProps, {}> {
  constructor(props: ISubnetViewProps) {
    super(props);
  }

  public render(): JSX.Element {
    const firstSubnetId = this.props.subnets[0].id;
    const subnetRoutes = this.props.subnets.map(subnet =>
      <Route key={subnet.id} path={"/config/subnets/" + subnet.id} component={SubnetConfig} />);

    return (
      <Switch>
        <Redirect exact={true} from="/config/subnets" to={"/config/subnets/" + firstSubnetId} />
        {subnetRoutes}
      </Switch>
    );
  }
}
