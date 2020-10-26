import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class CreateShipmentDialogue extends React.Component {
  constructor(props) {
    super();
    this.state = {
      buyerCRN: "",
      drugName: "",
      listOfAsset: "",
      transporterCRN: "",
      organization: "manufacturer"
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openCreateShipmentDialogue}
          onClose={() => this.props.onUpdateShipmentDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Shipments</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils to Create the shipment
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="buyerCRN"
              label="Buyer CRN"
              onChange={event => {
                const { value } = event.target;
                this.setState({ buyerCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="drugName"
              label="Drug Name"
              onChange={event => {
                const { value } = event.target;
                this.setState({ drugName: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="listOfAsset"
              label="List of Asset"
              onChange={event => {
                const { value } = event.target;
                this.setState({ listOfAsset: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="transporterCRN"
              onChange={event => {
                const { value } = event.target;
                this.setState({ transporterCRN: value });
              }}
              label="Transporter CRN"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.onUpdateShipmentDialogClosed(this.state)} color="primary">
              Create Shipment
            </Button>
            <Button onClick={() => this.props.onUpdateShipmentDialogClosed(this.state)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
