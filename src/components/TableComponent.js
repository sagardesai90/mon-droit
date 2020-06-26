import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./TableComponent.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { followerData: null };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    let followerData = await fetch("http://localhost:5000/followers", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) =>
        res.json().then((data) => {
          this.setState({ followerData: data });
        })
      )
      .catch((error) => console.log(error, "error"));
  }

  render() {
    let followerData = this.state.followerData;
    const renderTable = () => {
      if (followerData) {
        <TableContainer component={Paper}>
          <Table className="table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>;
      }
    };
    return (
      <div>
        <button onClick={() => this.getData()}>Get Followers</button>
        {renderTable()}
      </div>
    );
  }
}
