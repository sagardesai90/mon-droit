import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SortIcon from "./sort.png";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import TextareaAutosize from "react-textarea-autosize";
import UserProfile from "./UserProfile";
import "./TableComponent.css";

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followerData: null,
      order: null,
      selected: {},
      message: null,
      onDate: null,
    };
    this.getData = this.getData.bind(this);
    this.sortFollowers = this.sortFollowers.bind(this);
    this.select = this.select.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  async sendFollowersDM() {
    let followersToDM = await fetch("http://localhost:5000/followersdm", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        toDM: this.state.selected,
        message: this.state.message,
        createdOn: Date(),
      }),
    }).catch((error) => console.log(error, "error"));
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

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    let followerData = this.state.followerData;
    const renderTable = () => {
      if (followerData) {
        let names = Object.keys(followerData);
        return (
          <TableContainer>
            <Table className="table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false ? "cell" : "cell-dark"
                    }
                  >
                    Send
                  </StyledTableCell>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false ? "cell" : "cell-dark"
                    }
                  >
                    Name
                  </StyledTableCell>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false ? "cell" : "cell-dark"
                    }
                  >
                    Screen Name
                  </StyledTableCell>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false ? "cell" : "cell-dark"
                    }
                  >
                    Verified
                  </StyledTableCell>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false ? "cell" : "cell-dark"
                    }
                  >
                    Bio
                  </StyledTableCell>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false
                        ? "cell follow-count-cell"
                        : "cell-dark follow-count-cell"
                    }
                  >
                    <img
                      className="sort-icon"
                      src={SortIcon}
                      onClick={this.sortFollowers}
                      alt="sort"
                    />
                    Follower Count
                  </StyledTableCell>
                  <StyledTableCell
                    className={
                      this.props.darkMode === false ? "cell" : "cell-dark"
                    }
                  >
                    Location
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(followerData, "folowers_data").map((follower) => (
                  <StyledTableRow>
                    <Checkbox
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      onClick={(event) => this.select(follower)}
                    />
                    <StyledTableCell
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      component="th"
                      scope="row"
                    >
                      {follower}
                    </StyledTableCell>
                    <StyledTableCell
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      component="th"
                      scope="row"
                    >
                      {followerData[follower]["handle"]}
                    </StyledTableCell>
                    <StyledTableCell
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      align="left"
                    >
                      {followerData[follower]["verified"].toString()}
                    </StyledTableCell>
                    <StyledTableCell
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      align="left"
                    >
                      {followerData[follower]["bio"]}
                    </StyledTableCell>
                    <StyledTableCell
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      align="center"
                    >
                      {followerData[follower]["followers_count"]}
                    </StyledTableCell>
                    <StyledTableCell
                      className={
                        this.props.darkMode === false ? "cell" : "cell-dark"
                      }
                      align="left"
                    >
                      {followerData[follower]["location"]}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      } else {
        return (
          <div
            className={
              this.props.darkMode === false ? "placeholder" : "placeholder-dark"
            }
          >
            Table Here.
          </div>
        );
      }
    };
    return (
      <div className="container">
        <div className="left-side">
          <UserProfile />
          <TextareaAutosize
            minRows={12}
            maxRows={12}
            defaultValue="Craft your message here."
            onChange={this.handleChange.bind(this)}
          />
          <div>
            <button className="buttons" onClick={() => this.sendFollowersDM()}>
              Send
            </button>
            <button className="buttons" onClick={() => this.getData()}>
              Show Followers
            </button>
          </div>
        </div>
        {renderTable()}
      </div>
    );
  }
}
