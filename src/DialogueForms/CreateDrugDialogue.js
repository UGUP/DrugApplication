import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class CreateDrugDialogue extends React.Component {
  constructor(props) {
    super();
    this.state = {
      drugName: "",
      serialNo: "",
      mfgDate: "",
      expDate: "",
      companyCRN: "",
      organization: "manufacturer"
    }
    console.log(JSON.stringify(props, null, 2));
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openCreateDrugDialogue}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Drug</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils below to create a Drug
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="drug-name"
              label="Drug Name"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ drugName: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="serial-number"
              label="Serial Number"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ serialNo: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="manufacturer-date"
              label="ManufacturingDate"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ mfgDate: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="expiry-date"
              label="ExpiryDate"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ expDate: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="company-crn"
              label="CompanyCRN"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ companyCRN: value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClosed(this.state)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onDialogClosed(this.state)} color="primary">
              Create Drug
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
