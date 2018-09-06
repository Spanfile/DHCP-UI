import DHCPSubnet from "common/subnet/DHCPSubnet";
import * as React from "react";
import { NavLink } from "react-router-dom";

export interface ISubnetNavProps {
  subnets: DHCPSubnet[];
}

export default class SubnetNav extends React.Component<ISubnetNavProps, {}> {
  constructor(props: ISubnetNavProps) {
    super(props);
  }

  public render(): JSX.Element {
    const subnetLinks = this.props.subnets.map(subnet =>
      <NavLink
        key={subnet.id} to={"/config/subnets/" + subnet.id}
        activeClassName="bg-dark text-white"
        className="nav-link">{subnet.subnet.toString()}
      </NavLink>);

    return (
      <div>
        {subnetLinks}
      </div>
    );
  }
}
