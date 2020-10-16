import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Registerorganization from "../DialogueForms/Registerorganization";
import PurchaseOrderDetails from "./PurchaseOrderDetails";

export default class ManufacturerList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      openCreateOrganizationDialogue: false,
      showPurchaseOrderDetails: false,
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
      console.log(data);
      var manufacturerData = this.state.row;
      manufacturerData.push(data);
      this.setState({
        row: manufacturerData,
      });
    }
    this.setState({
      openCreateOrganizationDialogue: false,
    });
  }

  handleClick() {
    this.setState({
      openCreateOrganizationDialogue: true,
    });
  }

  showPurchaseOrderDetails(purchaseOrder) {
    this.setState({
      purchaseOrderDetials: purchaseOrder,
      showPurchaseOrderDetails: true,
    });
  }

  onDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showPurchaseOrderDetails: false,
    });
  }

  render() {
    return (
      <div>
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
                  <button
                    onClick={() => {
                      this.showPurchaseOrderDetails(row);
                    }}
                  >
                    View Details
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
          Create Purchase Order
        </button>
        <Registerorganization
          openCreateOrganizationDialogue={
            this.state.openCreateOrganizationDialogue
          }
          onDialogClosed={this.onDialogClosed}
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
    let dummyData = [];
    dummyData.push({
      buyerCRN: "DIST001",
      sellerCRN: "MAN001",
      drugName: "Paracetamol",
      quantity: "3",
      organization: "distributor",
    });
    dummyData.push({
      buyerCRN: "DIST002",
      sellerCRN: "MAN002",
      drugName: "Paracetamol-2",
      quantity: "4",
      organization: "distributor",
    });
    dummyData.push({
      buyerCRN: "DIST003",
      sellerCRN: "MAN003",
      drugName: "Paracetamol-3",
      quantity: "5",
      organization: "distributor",
    });
    return dummyData;
  }
}
