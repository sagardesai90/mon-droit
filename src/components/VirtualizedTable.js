import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";
import Checkbox from "@material-ui/core/Checkbox";
import SortIcon from "./sort.png";
import "./VirtualizedTable.css";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "handle", label: "Screen Name", minWidth: 100 },
  {
    id: "verified",
    label: "Verified",
    minWidth: 170,
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bio",
    label: "Bio",
    minWidth: 170,
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "follower_count",
    label: "Follower Count",
    minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "location",
    label: "Location",
    minWidth: 170,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  name,
  screen_name,
  verified,
  bio,
  follower_count,
  location
) {
  // const follower_count = verified / bio;
  return { name, screen_name, verified, bio, follower_count, location };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default class StickyHeadTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followerData: null,
      order: null,
      selected: {},
      message: null,
      onDate: null,
      page: 1,
      rowsPerPage: 5,
    };
    this.getData = this.getData.bind(this);
    this.sortFollowers = this.sortFollowers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
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
          this.setState({ followerData: data["followers"] });
        })
      )
      .catch((error) => console.log(error, "error"));
  }

  sortFollowers() {
    let followerList = this.state.followerData;
    let descSorted = _.orderBy(followerList, "followers_count", "desc");
    let ascSorted = _.orderBy(followerList, "followers_count", "asc");
    let sortedObj = {};
    if (this.state.order === "descending") {
      for (let i = 0; i < descSorted.length; i++) {
        sortedObj[descSorted[i]["handle"]] = descSorted[i];
      }
      this.setState({ followerData: sortedObj, order: "ascending" });
      console.log("#1");
    } else if (this.state.order === "ascending") {
      for (let i = 0; i < ascSorted.length; i++) {
        sortedObj[ascSorted[i]["handle"]] = ascSorted[i];
      }
      this.setState({ followerData: sortedObj, order: "descending" });
      console.log("#2");
    } else if (this.state.order === null) {
      for (let i = 0; i < ascSorted.length; i++) {
        sortedObj[ascSorted[i]["handle"]] = ascSorted[i];
      }
      this.setState({ followerData: sortedObj, order: "descending" });
      console.log("#3");
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  select(follower) {
    console.log(follower, "name selected");
    let currSelected = this.state.selected;
    if (!currSelected[follower]) {
      currSelected[follower] = this.state.followerData[follower]["user_id"];
    } else {
      delete currSelected[follower];
    }
    console.log(currSelected, "currSelected");
    this.setState({
      selected: currSelected,
    });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });
  };

  renderTable() {
    let followerData = this.state.followerData;
    console.log(followerData, "followerData");
    return (
      <Paper className="paper">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Selected</TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label == "Follower Count" ? (
                      <img
                        className="sort-icon"
                        src={SortIcon}
                        onClick={this.sortFollowers}
                      />
                    ) : null}
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(followerData)
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((follower) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={follower.code}
                    >
                      {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}

                      {/* {Object.keys(followerData[follower]).map((objKey) => {
                      // console.log(objKey, "objKey");
                      console.log(follower, "follower in VirTab");
                      return (
                        <TableCell key={objKey}>
                          {followerData[follower][objKey]}
                        </TableCell>
                      );
                    })} */}
                      <Checkbox onClick={(event) => this.select(follower)} />
                      <TableCell>{followerData[follower]["name"]}</TableCell>
                      <TableCell>{followerData[follower]["handle"]}</TableCell>
                      <TableCell>
                        {followerData[follower]["verified"].toString()}
                      </TableCell>
                      <TableCell>{followerData[follower]["bio"]}</TableCell>
                      <TableCell>
                        {followerData[follower]["followers_count"]}
                      </TableCell>
                      <TableCell>
                        {followerData[follower]["location"]}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 75, 100, 250]}
          component="div"
          count={rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

  componentDidMount() {
    this.getData();
  }
  // const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  render() {
    if (this.state.followerData == null) {
      return <p>Loading...</p>;
    }
    return this.renderTable();
  }
}
