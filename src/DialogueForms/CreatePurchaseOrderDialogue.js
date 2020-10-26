import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class CreatePurchaseOrderDialogue extends React.Component {
  constructor(props) {
    super();
    this.state = {
      buyerCRN: "",
      sellerCRN: "",
      drugName: "",
      quantity: "",
      organization: "distributor"
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openCreatePurchaseOrderDialogue}
          onClose={() => this.props.onPurchaseOrderDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create Purchase Orders
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils to Create the purchase order
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="BuyerCRN"
              label="BuyerCRN"
              onChange={event => {
                const { value } = event.target;
                this.setState({ buyerCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="SellerCRN"
              label="SellerCRN"
              onChange={event => {
                const { value } = event.target;
                this.setState({ sellerCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="DrugName"
              label="DrugName"
              onChange={event => {
                const { value } = event.target;
                this.setState({ drugName: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="Quantity"
              label="Quantity"
              type="number"
              onChange={event => {
                const { value } = event.target;
                this.setState({ quantity: value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.onPurchaseOrderDialogClosed(this.state)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.props.onPurchaseOrderDialogClosed(this.state)}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
