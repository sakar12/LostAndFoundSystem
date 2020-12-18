import React, { Component } from "react";
import "../assets/css/Inbox.css";
import axios from "axios";
import MessageList from "./MessageList";
import Message from "./Message";
import PageNumbers from "./PageNumbers";

export default class Inbox extends Component {
  state = {
    messageList: [],
    resultsPerPage: "",
    nowPage: "",
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const uid = this.props.uid;
    var url = "";
    if (this.props.userType === "ADMIN") {
      url = `/messages/getAdminMessage`;
    } else {
      url = `/messages/getmessagetest?uid=${uid}`;
    }
    axios
      .get(`${url}`)
      .then((res) =>
        this.setState({ messageList: res.data, nowPage: 1, resultsPerPage: 9 })
      );
    const interval = setInterval(() => {
      this.updateMessageList();
    }, 1000);
    return () => clearInterval(interval);
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ messageList: [] });
  }

  updateMessageList = () => {
    const uid = this.props.uid;
    var url = "";
    if (this.props.userType === "ADMIN") {
      url = `/messages/getAdminMessage?uid=${uid}`;
    } else {
      url = `/messages/getmessagetest?uid=${uid}`;
    }
    axios.get(`${url}`).then((res) => this.setState({ messageList: res.data }));
  };
  changePage = (pageNumber) => {
    this.setState({ nowPage: pageNumber });
    window.scrollTo(0, 0);
  };
  decreasePage = (e) => {
    this.setState({ nowPage: this.state.nowPage - 1 });
    window.scrollTo(0, 0);
  };
  increasePage = (e) => {
    this.setState({ nowPage: this.state.nowPage + 1 });
    window.scrollTo(0, 0);
  };

  render() {
    var pages = Math.floor(
      this.state.messageList.length / this.state.resultsPerPage
    );
    var remainder = this.state.messageList.length % this.state.resultsPerPage;
    if (remainder != 0) {
      pages += 1;
    }
    var pageNumbers = [];
    for (var i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
    var end = this.state.resultsPerPage * this.state.nowPage;
    var start = this.state.resultsPerPage * (this.state.nowPage - 1);
    return (
      <React.Fragment>
        <MessageList
          messageList={this.state.messageList.slice(start, end)}
          userType={this.props.userType}
        />
        <PageNumbers
          pageNumbers={pageNumbers}
          changePage={this.changePage}
          currentPage={this.state.nowPage}
          increasePage={this.increasePage}
          decreasePage={this.decreasePage}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }
}
