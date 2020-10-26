import React from "react";
import DistributorMenu from "./DistributorMenu";
import DistributorDrugList from "../ShipmentDrugPo/DistributorDrugList";
import PurchaseOrderList from "../ShipmentDrugPo/PurchaseOrderList";
import ShipmentList from "../ShipmentDrugPo/ShipmentList";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyleDiv = styled.div`
  width: 90%;
  length: 100%;
  max-width: 100rem;
  margin: 2rem auto;
  border: 8px solid #ccc;
  padding: 2rem;
  background: lightpink;
  font-size: 21px;
`;

class DistributorDashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectmenu: "distributor",
      showForm: false,
    };
    this.selectMenu = this.selectMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
  }

  handleClick() {
    console.log("Setting show form to true");
    this.setState({
      showForm: true,
    });
  }

  onDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showForm: false,
    });
  }

  selectMenu(value) {
    console.log("Select Menu updates");
    this.setState({
      selectmenu: value,
    });
  }

  render() {
    return (
      <StyleDiv style={{ display: "flex" }}>
        <StyleDiv style={{ width: "30%" }}>
          <DistributorMenu selectMenu={this.selectMenu} />
        </StyleDiv>
        <StyleDiv style={{ width: "70%" }}>
          {(() => {
            switch (this.state.selectmenu) {
              case "drug":
                return <DistributorDrugList />;
              case "purcahse-order":
                return <PurchaseOrderList />;
              case "shipment":
                return <ShipmentList />;
              default:
                return <DistributorDrugList />;
            }
          })()}
        </StyleDiv>
      </StyleDiv>
    );
  }
}
export default DistributorDashboard;
