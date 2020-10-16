import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class RetailDrugDialogue extends React.Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(props, null, 2));
    this.state = {
      drugName: "",
      sno: "",
      mDate: "",
      eDate: "",
      companyCrn: ""
    }
  }

  componentDidMount() {
    this.props.onDialogClosed();
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.openRetailDrugDialogue}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Update the Drug Details sold
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils to Update the Drug details
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="DrugName"
              label="DrugName"
              onChange={event => {
                const { value } = event.target;
                this.setState({ drugName: value });
              }}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="SerialNo"
              label="SerialNo"
              onChange={event => {
                const { value } = event.target;
                this.setState({ sno: value });
              }}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="retailerCRN"
              label="RetailerCRN"
              onChange={event => {
                const { value } = event.target;
                this.setState({ mDate: value });
              }}
              type="email"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="OrganizationRole"
              label="OrganizationRole"
              onChange={event => {
                const { value } = event.target;
                this.setState({ eDate: value });
              }}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="customerAadhar"
              label="customerAadhar"
              onChange={event => {
                const { value } = event.target;
                this.setState({ companyCRN: value });
              }}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Update Drug Details
            </Button>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
