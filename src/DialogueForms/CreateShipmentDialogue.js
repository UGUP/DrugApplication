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
      companyCRN: "",
      companyName: "",
      location: "",
      organization: "manufacturer"
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openCreateShipmentDialogue}
          onClose={() => this.props.onDialogClosed()}
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
              id="companyCRN"
              label="Company CRN"
              onChange={event => {
                const { value } = event.target;
                this.setState({ companyCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="companyName"
              label="Company Name"
              onChange={event => {
                const { value } = event.target;
                this.setState({ companyName: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              onChange={event => {
                const { value } = event.target;
                this.setState({ location: value });
              }}
              label="Location"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.onDialogClosed(this.state)} color="primary">
              Create Shipment
            </Button>
            <Button onClick={() => this.props.onDialogClosed(this.state)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
