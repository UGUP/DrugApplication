import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';

export default class Registerorganization extends React.Component {
  constructor(props) {
    super();
    this.state = {
      buyerCRN: "",
      sellerCRN: "",
      drugName: "",
      quantity: "",
      organizationRole: "distributor"
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openCreateOrganizationDialogue}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Organization</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils beow to register an Organization
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="companyCRN"
              label="Company CRN"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ buyerCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="sellerCRN"
              label="Seller CRN"
              type="email"
              onChange={event => {
                const { value } = event.target;
                this.setState({ sellerCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="drugName"
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
              id="quanity"
              label="Quantity"
              onChange={event => {
                const { value } = event.target;
                this.setState({ quantity: value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.onDialogClosed(this.state)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.props.onDialogClosed(this.state)} color="primary">
              Create Organization
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
