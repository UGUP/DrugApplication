import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UpdateShipmentDialogue from "../DialogueForms/UpdateShipmentDialogue";
import CreateShipmentDialogue from "../DialogueForms/CreateShipmentDialogue";
import {
  invokeTransaction,
  METHOD_CREATE_SHIPMENT,
  METHOD_UPDATE_SHIPMENT
} from "../network/NetworkApi";
import ToastServive from "react-material-toast";
import CircularProgress from "@material-ui/core/CircularProgress";
import {shipmentList} from "../data/GlobalData"

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
    this.onShipmentDialogClosed = this.onShipmentDialogClosed.bind(this);
    this.onUpdateShipmentDialogClosed = this.onUpdateShipmentDialogClosed.bind(this);
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onUpdateShipmentDialogClosed(data) {
    if (data && data.companyCRN != "") {
      console.log("Hello " + JSON.stringify(data));
      this.createNewShipment1234(data);
    }
    this.setState({
      openCreateShipmentDialogue: false,
    });
  }


  onShipmentDialogClosed(data) {
    this.updateShipment(data);
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
      openUpdateShipmentDialogue: true,
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
                <TableCell align="right">Buyer CRN</TableCell>
                <TableCell align="right">Drug Name</TableCell>
                <TableCell align="right">List of Asset</TableCell>
                <TableCell align="right">Transporter CRN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map((row) => (
                <TableRow key={row.companyCRN}>
                  <TableCell align="right">{row.buyerCRN}</TableCell>
                  <TableCell align="right">{row.drugName}</TableCell>
                  <TableCell align="right">{row.listOfAsset}</TableCell>
                  <TableCell align="right">{row.transporterCRN}</TableCell>
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
          onUpdateShipmentDialogClosed={this.onUpdateShipmentDialogClosed}
        />
        <UpdateShipmentDialogue
          shipmentDetails={this.state.updateShipmentDialogue}
          openUpdateShipmentDialogue={this.state.openUpdateShipmentDialogue}
          onShipmentDialogClosed={this.onShipmentDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
  
    return shipmentList;
  }

  createNewShipment1234(data) {
    const args = [];
    args.push(data.buyerCRN);
    args.push(data.drugName);
    args.push(data.listOfAsset);
    args.push(data.transporterCRN);
    this.setState({
      showProgress: true,
    });

    invokeTransaction(METHOD_CREATE_SHIPMENT, args)
      .then((response) => {
        return response.json();
      })
      .then(response => {
        this.setState({
          showProgress: false,
        });
        if (response.returnCode === "Failure") {
          this.showToast(true, response.info.peerErrors[0].errMsg);
        } else {
          data.index = this.state.row.length;
          var manufacturerData = this.state.row;
          manufacturerData.push(data);
          this.setState({
            row: manufacturerData,
          });
          this.showToast(false, "Shipment created successfully.");
        }
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        });
        this.showToast(true, "Failed to create shipment.");
      });
  }

  updateShipment(data) {
    const args = [];
    args.push(data.buyerCRN);
    args.push(data.drugName);
    args.push(data.transporterCRN);
    this.setState({
      showProgress: true,
    });

    invokeTransaction(METHOD_UPDATE_SHIPMENT, args)
      .then((response) => {
        return response.json();
      })
      .then(response => {
        this.setState({
          showProgress: false,
        });
        if (response.returnCode === "Failure") {
          this.showToast(true, response.info.peerErrors[0].errMsg);
        } else {
          this.showToast(false, "Shipment updated successfully.");
        }
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        });
        this.showToast(true, "Failed to update shipment.");
      });
  }

  showToast(error, msg) {
    if (error) {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
  }
}
