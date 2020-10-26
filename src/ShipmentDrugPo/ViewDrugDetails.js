import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';
import {
  invokeTransaction,
  METHOD_VIEW_CURRENT_STATE,
} from "../network/NetworkApi";
import ToastServive from "react-material-toast";
import CircularProgress from "@material-ui/core/CircularProgress";

const toast = ToastServive.new({
  place: "topRight",
  duration: 4,
  maxCount: 1,
});

export default class ViewDrugDetails extends React.Component {

  constructor(props) {
    super();
    console.log(JSON.stringify(props, null, 2));
    this.state = {
      productID: "",
      name: "",
      manufacturer: "",
      manufacturingDate: "",
      expiryDate: "",
      owner: "",
      showProgress: false
    };
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openViewDrugDetailsDialog}
          onClose={() => this.props.onViewDrugDetailsDialogClosed()}
          onEntered={() => this.getCurrentStatusOfShipment(this.props.drugDetails.drugName, this.props.drugDetails.serialNo)}//"Paracetamol", "001"
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Drug History</DialogTitle>
          <DialogContent>
            {(() => {
              if (this.state.showProgress) {
                return (
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress color="secondary" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <p>Fetching details. Please wait....</p>
                    </div>
                  </div>
                );
              }
            })()}
            <InputLabel classname="test-label">{this.state.productID !== "" ? "Product Id: " + this.state.productID : ""}</InputLabel>
            <InputLabel classname="test-label">{this.state.name !== "" ? "Name: " + this.state.name : ""}</InputLabel>
            <InputLabel classname="test-label">{this.state.manufacturer !== "" ? "Manufacturer: " + this.state.manufacturer : ""}</InputLabel>
            <InputLabel classname="test-label">{this.state.manufacturingDate !== "" ? "Manufacturing Date:  " + this.state.manufacturingDate : ""}</InputLabel>
            <InputLabel classname="test-label">{this.state.expiryDate !== "" ? "Expiry Date:  " + this.state.expiryDate : ""}</InputLabel>
            <InputLabel classname="test-label">{this.state.owner !== "" ? "Owner: " + this.state.owner : ""}</InputLabel>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onViewDrugDetailsDialogClosed} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  getCurrentStatusOfShipment(drugName, sno) {
    console.log("Data " + JSON.stringify(this.props));
    if (this.props.openViewDrugDetailsDialog) {
      //this.getCurrentStatusOfShipment(this.props.drugName, this.props.sno)
      const args = [];
      args.push(drugName);
      args.push(sno);
      this.setState({
        showProgress: true,
      });
      invokeTransaction(METHOD_VIEW_CURRENT_STATE, args)
        .then((response) => {
          return response.json();
        })
        .then(response => {
          this.setState({
            showProgress: false,
          });
          if (response.returnCode === "Success") {
            this.setState({
              productID: response.result.payload.productID,
              name: response.result.payload.name,
              manufacturer: response.result.payload.manufacturer,
              manufacturingDate: response.result.payload.manufacturingDate,
              expiryDate: response.result.payload.expiryDate,
              owner: response.result.payload.owner,
            })
          } else {
            this.showToast(true);
          }
        })
        .catch((error) => {
          this.setState({
            showProgress: false,
          });
          this.showToast(true);
        });
    } else {
      console.log("Not Fetching....")
    }
  }

  showToast(error) {
    if (error) {
      toast.error("Error fetching drug status");
    } else {
      toast.success("Status fetched successfully");
    }
  }

}
