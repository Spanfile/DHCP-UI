import ILease from "common/ILease";
import Lease from "components/Lease";
import Table from "components/Table";
import * as moment from "moment";
import * as React from "react";
import * as SocketIOClient from "socket.io-client";

export interface ILeasesState {
  leases: ILease[];
}

export default class Leases extends React.Component<{}, ILeasesState> {
  private socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    this.socket = SocketIOClient("http://localhost:5000/leases");
    this.socket.on("connect", () => {
      console.log("connected");
      this.socket.emit('hello');
    });

    this.state = {
      leases: [
        {
          address: 167774727,
          ends: moment("2018-07-22T13:15:36"),
          hardware: 212132660153088,
          hostname: "OnePlus_3"
        },
        {
          address: 167774855,
          ends: moment("2018-07-23T12:32:20"),
          hardware: 48751574531902,
          hostname: "SanteriWin10"
        },
        {
          address: 167774856,
          ends: moment("2018-07-23T04:51:05"),
          hardware: 345051650480,
          hostname: "unifi"
        }
      ]
    };
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public render() {
    const rows = [];
    for (const lease of this.state.leases) {
      rows.push(new Lease(lease));
    }

    const columns = [
      "", "IP", "MAC", "Hostname", "Ends"
    ];

    return (
      <Table columns={columns}>
        {this.state.leases.map((lease: ILease) =>
        <Lease
          key={lease.address}
          address={lease.address}
          hardware={lease.hardware}
          ends={lease.ends}
          hostname={lease.hostname}
        />)}
      </Table>
    );
  }
}
