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

    this.socket = SocketIOClient("http://localhost:5000/leases");
    this.socket.on("connect", () => {
      console.log("connected");
      this.socket.emit('hello');
    });

    this.state = {
      leases: [
        {
          address: 167774727,
          ends: "2018-07-22T13:15:36",
          hardware: 212132660153088,
          hostname: "OnePlus_3"
        },
        {
          address: 167774855,
          ends: "2018-07-23T12:32:20",
          hardware: 48751574531902,
          hostname: "SanteriWin10"
        },
        {
          address: 167774856,
          ends: "2018-07-23T04:51:05",
          hardware: 345051650480,
          hostname: "unifi"
        },
        {
          address: 167774727,
          ends: "2018-07-22T13:15:36",
          hardware: 212132660153089,
          hostname: "OnePlus_3"
        },
        {
          address: 167774855,
          ends: "2018-07-23T12:32:20",
          hardware: 48751574531903,
          hostname: "SanteriWin10"
        },
        {
          address: 167774856,
          ends: "2018-07-23T04:51:05",
          hardware: 345051650481,
          hostname: "unifi"
        },
        {
          address: 167774727,
          ends: "2018-07-22T13:15:36",
          hardware: 212132660153090,
          hostname: "OnePlus_3"
        },
        {
          address: 167774855,
          ends: "2018-07-23T12:32:20",
          hardware: 48751574531904,
          hostname: "SanteriWin10"
        },
        {
          address: 167774856,
          ends: "2018-07-23T04:51:05",
          hardware: 345051650482,
          hostname: "unifi"
        }
      ]
    };
  }

  public componentWillUnmount() {
    this.socket.disconnect();
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
      <Table dataSource={leases} columns={columns}/>
    );
  }
}
