import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import updateShipmentDialogue from "../DialogueForms/UpdateShipmentDialogue";
import CreateShipmentDialogue from "../DialogueForms/CreateShipmentDialogue";
import {
  invokeTransaction,
  METHOD_CREATE_SHIPMENT,
} from "../network/NetworkApi";
import ToastServive from "react-material-toast";
import CircularProgress from "@material-ui/core/CircularProgress";

const toast = ToastServive.new({
  place: "topRight",
  duration: 4,
  maxCount: 1,
});

export default class ShipmentList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      openCreateShipmentDialogue: false,
      showShipmentDetails: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onDialogClosed(data) {
    if (data && data.companyCRN != "") {
      this.createNewShipment(data);
    }
    this.setState({
      openCreateShipmentDialogue: false,
    });
  }

  onShipmentDialogClosed(data) {
    this.setState({
      openUpdateShipmentDialogue: false,
    });
  }

  handleClick() {
    this.setState({
      openCreateShipmentDialogue: true,
    });
  }

  showShipmentDetails(shipment) {
    this.setState({
      updateShipmentDialogue: shipment,
      showShipmentDetails: true,
    });
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.showProgress) {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
              </div>
            );
          }
        })()}
        <TableContainer component={Paper}>
          <Table className={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Company CRN</TableCell>
                <TableCell align="right">Company Name</TableCell>
                <TableCell align="right">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map((row) => (
                <TableRow key={row.companyCRN}>
                  <TableCell align="right">{row.companyCRN}</TableCell>
                  <TableCell align="right">{row.companyName}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <button
                    onClick={() => {
                      this.showShipmentDetails(row);
                    }}
                  >
                    update Shipment
                  </button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          Create Shipment
        </button>
        <CreateShipmentDialogue
          openCreateShipmentDialogue={this.state.openCreateShipmentDialogue}
          onDialogClosed={this.onDialogClosed}
        />
        <updateShipmentDialogue
          openUpdateShipmentDialogue={this.state.openUpdateShipmentDialogue}
          onShipmentDialogClosed={this.onShipmentDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
    let dummyData = [];
    dummyData.push({
      companyCRN: "Retailer1",
      companyName: "Retailer",
      location: "Ludhiana",
    });
    dummyData.push({
      companyCRN: "Retailer",
      companyName: "Retailer2",
      location: "Bangalore",
    });
    dummyData.push({
      companyCRN: "Retailer",
      companyName: "Retailer3",
      location: "MP",
    });
    return dummyData;
  }

  createNewShipment(data) {
    const args = [];
    args.push(data.companyCRN);
    args.push(data.companyName);
    args.push(data.location);
    this.setState({
      showProgress: true,
    });
    invokeTransaction(METHOD_CREATE_SHIPMENT, args)
      .then((response) => {
        this.setState({
          showProgress: false,
        });
        if (response.status === 400) {
          this.showToast(true);
        } else if (response.status === 201) {
          var manufacturerData = this.state.row;
          manufacturerData.push(data);
          this.setState({
            row: manufacturerData,
          });
          this.showToast(false);
        }
        return response;
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        });
        this.showToast(true);
      });
  }

  showToast(error) {
    if (error) {
      toast.error("Shipment already exists!!");
    } else {
      toast.success("Shipment created successfully.");
    }
  }
}
