import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';


export default class PurchaseOrderDetails extends React.Component {
  constructor(props) {
    super();
    console.log(JSON.stringify(props, null, 2));
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openViewPurchaseDialog}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Purchase Order Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Detials of the selected purchase order
            </DialogContentText>
            <InputLabel classname="test-label">Buyer CRN: {this.props.purchaseOrderDetials ? this.props.purchaseOrderDetials.buyerCRN : ""}</InputLabel>
            <InputLabel classname="test-label">Seller Name: {this.props.purchaseOrderDetials ? this.props.purchaseOrderDetials.sellerCRN : ""}</InputLabel>
            <InputLabel classname="test-label">Drug Name: {this.props.purchaseOrderDetials ? this.props.purchaseOrderDetials.drugName : ""}</InputLabel>
            <InputLabel classname="test-label">Quantity: {this.props.purchaseOrderDetials ? this.props.purchaseOrderDetials.quantity : ""}</InputLabel>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
