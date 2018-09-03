import API from "API";
import Lease, { ITransmittedLease } from "common/Lease";
import Table from "components/table/Table";
import * as React from "react";
import * as SocketIOClient from "socket.io-client";

export interface ILeasesState {
  leases: ITransmittedLease[];
}

export default class Leases extends React.Component<{}, ILeasesState> {
  private socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    this.state = {
      leases: []
    };
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public componentDidMount() {
    this.socket = SocketIOClient("http://localhost:5000/leases");
    this.socket.on("connect", () => {
      console.log("connected");
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });

    this.socket.on("leases", (data: object) => {
      console.log(data);
      console.log("leases changed");
    });

    API.get("/leases").then(response => {
      console.log(response);
      const leases = this.buildLeasesFromResponse(response.data);
      this.setState({
        leases
      });
    });
  }

  public render() {
    const leases: Lease[] = this.state.leases.map(l => new Lease(l));
    const columns = [{
      header: "Address",
      property: "address"
    }, {
      header: "MAC",
      property: "hardware"
    }, {
      header: "Hostname",
      property: "hostname"
    }, {
      header: "Ends",
      property: "ends"
    }];

    return (
      <Table<Lease> dataSource={leases} columns={columns} />
    );
  }

  private buildLeasesFromResponse(responseData: any[]): ITransmittedLease[] {
    return responseData.map(data => {
      return {
        address: data.address,
        hardware: data.hardware,
        ends: data.ends,
        hostname: data["client-hostname"]
      };
    });
  }
}
