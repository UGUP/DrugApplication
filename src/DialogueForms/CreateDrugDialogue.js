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
      showProgress: false,
    };
    console.log(JSON.stringify(props, null, 2));
  }

  componentDidMount() {
    this.props.onDialogClosed();
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
              id="drugName1"
              label="DrugName"
              type="email"
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ drugName1: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="serialNumber"
              label="SerialNumber"
              type="email"
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ serialNumber: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="manufacturingDate"
              label="ManufacturingDate"
              type="email"
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ manufacturingDate: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="expiryDate"
              label="ExpiryDate"
              type="email"
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ expiryDate: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="companyCRN"
              label="CompanyCRN"
              type="email"
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ companyCRN: value });
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="organizationrole"
              label="Organization Role"
              type="email"
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ organizationrole: value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Create Drug
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
