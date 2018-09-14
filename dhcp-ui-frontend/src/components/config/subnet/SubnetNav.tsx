import IDHCPSubnet from "common/config/subnet/IDHCPSubnet";
import * as React from "react";
import { NavLink } from "react-router-dom";

export interface ISubnetNavProps {
  subnets: {
    [id: number]: IDHCPSubnet
  };
}

export default class SubnetNav extends React.Component<ISubnetNavProps> {
  constructor(props: ISubnetNavProps) {
    super(props);
  }

  public render(): JSX.Element {
    const subnetLinks: JSX.Element[] = [];
    Object.entries(this.props.subnets).forEach(([id, subnet]) => {
      subnetLinks.push(<NavLink
        key={id} to={"/config/subnets/" + id}
        activeClassName="bg-dark text-white"
        className="nav-link">{subnet.common.subnet.toString()}
      </NavLink>);
    });

    return (
      <div>
        {subnetLinks}
      </div>
    );
  }
}
