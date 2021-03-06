import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ViewDrugDetailsDialogue from "../DialogueForms/ViewDrugDetailsDialogue";

export default class DistributorDrugList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      openCreateDrugDialogue: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
    this.onDrugDetailsDialogClosed = this.onDrugDetailsDialogClosed.bind(this);
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onDialogClosed(data) {
    if (data && data.companyCRN != "") {
      console.log(data);
      var distributorData = this.state.row;
      distributorData.push(data);
      this.setState({
        row: distributorData,
      });
    }
    this.setState({
      openCreateDrugDialogue: false,
    });
  }

  onDrugDetailsDialogClosed() {
    this.setState({
      showViewDrugDetailsDialogue: false,
    });
  }

  showViewDrugDetailsDialogue(drug) {
    this.setState({
      CreateDrugDialogue: drug,
      showViewDrugDetailsDialogue: true,
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
                  <TableCell align="right">{row.sno}</TableCell>
                  <TableCell align="right">{row.mDate}</TableCell>
                  <TableCell align="right">{row.eDate}</TableCell>
                  <TableCell align="right">{row.companyCrn}</TableCell>
                  <button
                    onClick={() => {
                      this.showViewDrugDetailsDialogue(row);
                    }}
                  >
                    View Details
                  </button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ViewDrugDetailsDialogue
          ViewDrugDetailsDialogue={this.state.ViewDrugDetailsDialogue}
          openViewDrugDetailsDialogue={this.state.showViewDrugDetailsDialogue}
          onDrugDetailsDialogClosed={this.onDrugDetailsDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
    let dummyData = [];
    dummyData.push({
      drugName: "Combliflam",
      sno: "123433d3r3f234",
      mDate: "20-02-2020",
      eDate: "20-02-2025",
      companyCrn: "location",
    });
    dummyData.push({
      drugName: "Zupar",
      sno: "123433d3r3f234",
      mDate: "20-02-2020",
      eDate: "20-02-2025",
      companyCrn: "location",
    });
    dummyData.push({
      drugName: "Sumo",
      sno: "123433d3r3f234",
      mDate: "20-02-2020",
      eDate: "20-02-2025",
      companyCrn: "location",
    });
    return dummyData;
  }
}
