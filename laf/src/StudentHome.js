import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Items from "./components/Items";
import ItemList from "./components/ItemList.js";
import Inbox from "./components/Inbox.js";
import ShowMessages from "./components/ShowMessages.js";
import SearchResult from "./components/SearchResult.js";
import axios from "axios";
import MyItems from "./components/MyItems";

class StudentHome extends Component {
  state = {
    uid: 1,
    searchKey: "",
    redirectTo: "",
    itemList: [],
    myList: [],
    currentPage: "LOST",
    action: "",
    userInfo: this.props.userInfo,
    tempList: [],
  };

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ itemList: [] });
  }

  clearList = () => {
    this.setState({ itemList: [] });
  };

  logout = () => {
    this.props.logout();
    this.setState({ redirect: true, redirectTo: "LOGOUT" });
  };

  showMyItems = (e) => {
    e.preventDefault();
    this.setState({ currentPage: "MYITEMS", action: "" });
    var uid = 1;
    var url = `/messages/myItems?uid=${uid}&type=LOST`;
    axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
  };

  searchTextOnChange = (e) => {
    this.setState({ searchKey: e.target.value });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <Router>
        <Header
          logout={this.logout}
          search={this.search}
          searchTextOnChange={this.searchTextOnChange}
          showLost={this.showLost}
          showMyItems={this.showMyItems}
          searchKey={this.state.searchKey}
          searchHandler={this.searchHandler}
          uid={this.props.userInfo.student_id}
          userInfo={this.props.userInfo}
          userType="STUDENT"
        />
        <Route
          path="/StudentHome/search"
          render={(props) => (
            <React.Fragment>
              <p>{this.state.searchKey}</p>
              <ItemList
                itemType="SEARCH"
                searchKey={this.state.searchKey}
                uid={this.state.uid}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/StudentHome/found"
          render={(props) => (
            <React.Fragment>
              <ItemList itemType="FOUND" uid={this.state.uid} />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/StudentHome/inbox"
          render={(props) => (
            <React.Fragment>
              <Inbox
                uid={this.props.userInfo.student_id}
                userType="STUDENT"
                clearList={this.clearList}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/StudentHome/test"
          render={(props) => <React.Fragment></React.Fragment>}
        />
        <Route
          exact
          path="/StudentHome/messages/:studentId/:itemId/:userType"
          component={ShowMessages}
        />

        <Route
          exact
          path="/StudentHome"
          render={(props) => (
            <React.Fragment>
              <ItemList
                items={this.state.itemList}
                itemType={this.state.currentPage}
                uid={this.props.userInfo.student_id}
                action={this.state.action}
                searchKey={this.state.searchKey}
                userInfo={this.props.userInfo}
                userType="STUDENT"
                clearList={this.clearList}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/StudentHome/myItems"
          render={(props) => (
            <React.Fragment>
              {/* <ItemList
                items={this.state.myList}
                showFound={this.showFound}
                showLost={this.showLost}
                itemType={"MYITEMS"}
                uid={this.state.uid}
                action={this.state.action}
                searchKey={this.state.searchKey}
              /> */}
              <MyItems
                userInfo={this.props.userInfo}
                userType="STUDENT"
                clearList={this.clearList}
              />
            </React.Fragment>
          )}
        />

        <Footer />
      </Router>
    );
  }
}

export default StudentHome;
