import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PurchaseOrderDetails from "./PurchaseOrderDetails";
import CreatePurchaseOrderDialogue from "../DialogueForms/CreatePurchaseOrderDialogue";
import { invokeTransaction, METHOD_CREATE_PO } from "../network/NetworkApi";
import ToastServive from "react-material-toast";
import CircularProgress from "@material-ui/core/CircularProgress";
import {poList} from "../data/GlobalData"

const toast = ToastServive.new({
  place: "topRight",
  duration: 4,
  maxCount: 1,
});

export default class ManufacturerList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      onPurchaseOrderDialogClosed: false,
      showPurchaseOrderDetails: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
    this.onPurchaseOrderDialogClosed = this.onPurchaseOrderDialogClosed.bind(
      this
    );
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onPurchaseOrderDialogClosed(data) {
    if (data && data.companyCRN != "") {
      this.createNewPO(data);
    }
    this.setState({
      openCreatePurchaseOrderDialogue: false,
    });
  }

  handleClick() {
    this.setState({
      openCreatePurchaseOrderDialogue: true,
    });
  }

  onDialogClosed() {
    this.setState({
      showPurchaseOrderDetails: false,
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
                <TableCell align="right">Seller CRN</TableCell>
                <TableCell align="right">Drug Name</TableCell>
                <TableCell align="right">Quanity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map((row) => (
                <TableRow key={row.buyerCRN}>
                  <TableCell align="right">{row.buyerCRN}</TableCell>
                  <TableCell align="right">{row.sellerCRN}</TableCell>
                  <TableCell align="right">{row.drugName}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
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
          Create Purchase Order
        </button>
        <CreatePurchaseOrderDialogue
          openCreatePurchaseOrderDialogue={
            this.state.openCreatePurchaseOrderDialogue
          }
          onPurchaseOrderDialogClosed={this.onPurchaseOrderDialogClosed}
        />
        <PurchaseOrderDetails
          purchaseOrderDetials={this.state.purchaseOrderDetials}
          openViewPurchaseDialog={this.state.showPurchaseOrderDetails}
          onDialogClosed={this.onDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
    return poList;
  }

  createNewPO(data) {
    const args = [];
    args.push(data.buyerCRN);
    args.push(data.sellerCRN);
    args.push(data.drugName);
    args.push(data.quantity);
    args.push("distributor");
    this.setState({
      showProgress: true,
    });
    invokeTransaction(METHOD_CREATE_PO, args)
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
          var manufacturerData = this.state.row;
          manufacturerData.push(data);
          this.setState({
            row: manufacturerData,
          });
          this.showToast(false, "PO created successfully!!");
        }
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        });
        this.showToast(true, "Error creating PO");
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
