import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class ViewDrugDetailsDialogue extends React.Component {
  constructor(props) {
    super();
    console.log(JSON.stringify(props, null, 2));
  }

  componentDidMount() {
    this.props.onDrugDetailsDialogClosed();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openViewDrugDetailsDialogue}
          onClose={() => this.props.onDrugDetailsDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            The details of the Drug
          </DialogTitle>
          <DialogContent>
            <DialogContentText>The details of the Drug</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="drug-name"
              label="Drug Name"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="serial-number"
              label="Serial Number"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="manufacturer-date"
              label="Manufacturer Date"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="expiry-date"
              label="Expiry Date"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="company-crn"
              label="Company CRN"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="organization-role"
              label="Organization Role"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onDrugDetailsDialogClosed}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
