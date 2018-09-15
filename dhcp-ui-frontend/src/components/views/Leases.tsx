import API from "API";
import Lease, { ITransmittedLease } from "common/Lease";
import Table from "components/table/Table";
import * as React from "react";
import * as SocketIOClient from "socket.io-client";

export interface ILeasesState {
  leases: ITransmittedLease[];
  emptyDisplay: string;
}

export default class Leases extends React.Component<{}, ILeasesState> {
  private static readonly NO_LEASES = "No leases";
  private static readonly NETWORK_ERROR = "Network error";

  private socket: SocketIOClient.Socket;

  // tslint:disable-next-line:no-any
  constructor(props: any) {
    super(props);

    this.state = {
      leases: [],
      emptyDisplay: Leases.NO_LEASES
    };
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public componentDidMount() {
    this.socket = SocketIOClient("http://localhost:5000/leases", {
      autoConnect: false
    });

    this.socket.on("leases", (data: object[]) => {
      console.log("got leases");
      console.log(data);
      const leases = this.buildLeasesFromResponse(data);
      this.setState({
        leases
      });
    });

    this.initialFetchLeases();
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
      <Table<Lease>
        dataSource={leases}
        columns={columns}
        emptyDisplay={this.state.emptyDisplay} />
    );
  }

  private initialFetchLeases() {
    this.socket.on("connect", () => {
      console.log("initial connection");
      this.socket.send("get");
      this.socket.off("connect");
    });

    API.get("/leases").then(response => {
      console.log(response);
      const leases = this.buildLeasesFromResponse(response.data);
      this.setState({
        leases,
        emptyDisplay: Leases.NO_LEASES
      });
    }).catch(reason => {
      console.log(reason);
      this.setState({
        emptyDisplay: Leases.NETWORK_ERROR
      });
    });
  }

  // tslint:disable-next-line:no-any
  private buildLeasesFromResponse(responseData: any[]): ITransmittedLease[] {
    return responseData.map(data =>
      ({
        address: data.address,
        hardware: data.hardware,
        ends: data.ends,
        hostname: data["client-hostname"]
      }));
  }
}
