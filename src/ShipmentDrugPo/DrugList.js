import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateDrugDialogue from "../DialogueForms/CreateDrugDialogue";
import { invokeTransaction, METHOD_CREATE_DRUG } from "../network/NetworkApi";
import ToastServive from "react-material-toast";
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewDrugDetails from "./ViewDrugDetails";
import {drugList} from "../data/GlobalData"

const toast = ToastServive.new({
  place: "topRight",
  duration: 5,
  maxCount: 1,
});

export default class DrugList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      openCreateDrugDialogue: false,
      openViewDrugDetailsDialog: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosedForDrug = this.onDialogClosedForDrug.bind(this);
    this.onViewDrugDetailsDialogClosed = this.onViewDrugDetailsDialogClosed.bind(
      this
    );
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onDialogClosedForDrug(data) {
    console.log("I am here 45");
    if (data && data.companyCRN != "") {
      this.createNewDrug(data);
    }
    this.setState({
      openCreateDrugDialogue: false,
    });
  }

  onViewDrugDetailsDialogClosed() {
    this.setState({
      openViewDrugDetailsDialog: false,
    });
  }

  showViewDrugDetailsDialogue(drug) {
    this.setState({
      drugDetails: drug,
      openViewDrugDetailsDialog: true,
    });
  }

  handleClick() {
    this.setState({
      openCreateDrugDialogue: true,
    });
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.showProgress) {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
              </div>
            );
          }
        })()}
        <TableContainer component={Paper}>
          <Table className={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Drug Name</TableCell>
                <TableCell align="right">S.No</TableCell>
                <TableCell align="right">M.Date</TableCell>
                <TableCell align="right">E.Date</TableCell>
                <TableCell align="right">Company CRN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map((row) => (
                <TableRow key={row.companyCRN}>
                  <TableCell align="right">{row.drugName}</TableCell>
                  <TableCell align="right">{row.serialNo}</TableCell>
                  <TableCell align="right">{row.mfgDate}</TableCell>
                  <TableCell align="right">{row.expDate}</TableCell>
                  <TableCell align="right">{row.companyCRN}</TableCell>
                  <div>
                  <button
                    onClick={() => {
                      this.showViewDrugDetailsDialogue(row);
                    }}
                  >
                    View Current State
                  </button>
                  <button
                    onClick={() => {
                      this.showViewDrugDetailsDialogue(row);
                    }}
                  >
                    View History
                  </button>
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          Create Drug
        </button>

        <CreateDrugDialogue
          openCreateDrugDialogue={this.state.openCreateDrugDialogue}
          onDialogClosedForDrug={this.onDialogClosedForDrug}
        />

        <ViewDrugDetails
          drugDetails={this.state.drugDetails}
          openViewDrugDetailsDialog={this.state.openViewDrugDetailsDialog}
          onViewDrugDetailsDialogClosed={this.onViewDrugDetailsDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
    return drugList;
  }

  createNewDrug(data) {
    const args = [];
    args.push(data.drugName);
    args.push(data.serialNo);
    args.push(data.mfgDate);
    args.push(data.expDate);
    args.push(data.companyCRN);
    args.push("manufacturer");
    this.setState({
      showProgress: true,
    });
    console.log("Reached here now 187");
    invokeTransaction(METHOD_CREATE_DRUG, args)
      .then((response) => {
        return response.json();
      })
      .then(response => {
        console.log("Reached here now 193");
        this.setState({
          showProgress: false,
        });
        if (response.returnCode === "Failure") {
          console.log("Reached here now 198");
          this.showToast(true, response.info.peerErrors[0].errMsg);
        } else {
          console.log("Reached here now 201");
          var manufacturerData = this.state.row;
          manufacturerData.push(data);
          this.setState({
            row: manufacturerData,
          });
          this.showToast(false, "Drug created successfully.");
        }
      })
      .catch((error) => {
        console.log("Reached here now 211");
        this.setState({
          showProgress: false,
        });
        this.showToast(true, "Failed to create drug.");
      });
  }

  showToast(error, msg) {
    if (error) {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
  }

}
