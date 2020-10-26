import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Registerorganization from "../DialogueForms/Registerorganization";
import ToastServive from "react-material-toast";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  invokeTransaction,
  METHOD_REGISTER_COMPANY,
} from "../network/NetworkApi";

const toast = ToastServive.new({
  place: "topRight",
  duration: 4,
  maxCount: 1,
});

export default class DistributorList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      openCreateOrganizationDialogue: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onDialogClosed(data) {
    if (data && data.companyCRN != "") {
      this.createNewOrganization(data);
    }
    this.setState({
      openCreateOrganizationDialogue: false,
    });
  }

  handleClick() {
    this.setState({
      openCreateOrganizationDialogue: true,
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
                <TableCell align="right">Company CRN</TableCell>
                <TableCell align="right">Company Name</TableCell>
                <TableCell align="right">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map((row) => (
                <TableRow key={row.companyCRN}>
                  <TableCell align="right">{row.companyCRN}</TableCell>
                  <TableCell align="right">{row.companyName}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
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
          Create Distributor
        </button>
        <Registerorganization
          openCreateOrganizationDialogue={
            this.state.openCreateOrganizationDialogue
          }
          onDialogClosed={this.onDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
    let dummyData = [];
    dummyData.push({
      companyCRN: "DS001",
      companyName: "Sun Pharma1",
      location: "location",
    });
    dummyData.push({
      companyCRN: "DS002",
      companyName: "Sun Pharma2",
      location: "location2",
    });
    dummyData.push({
      companyCRN: "DS003",
      companyName: "Sun Pharma3",
      location: "location3",
    });
    return dummyData;
  }

  createNewOrganization(data) {
    const args = [];
    args.push(data.companyCRN);
    args.push(data.companyName);
    args.push(data.location);
    args.push("distributor");
    this.setState({
      showProgress: true,
    });
    invokeTransaction(METHOD_REGISTER_COMPANY, args)
      .then((response) => {
        this.setState({
          showProgress: false,
        });
        if (response.status === 400) {
          this.showToast(true);
        } else if (response.status === 201) {
          var manufacturerData = this.state.row;
          manufacturerData.push(data);
          this.setState({
            row: manufacturerData,
          });
          this.showToast(false);
        }
        return response;
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        });
        this.showToast(true);
      });
  }

  showToast(error) {
    if (error) {
      toast.error("Organization already exists!!");
    } else {
      toast.success("Organization created successfully.");
    }
  }
}
