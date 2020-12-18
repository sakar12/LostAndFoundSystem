import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ItemList.css";
import Items from "./Items.js";
import PostItem from "./PostItem.js";
import axios from "axios";
import AdminItemButtons from "./AdminItemButtons";
import StudentItemButtons from "./StudentItemButtons";
import CompletedFilter from "./CompletedFilter";
import PageNumbers from "./PageNumbers";

class ItemList extends Component {
  state = {
    items: [],
    startIndex: "",
    endIndex: "",
    resultsPerPage: "",
    currentPage: "",
    itemList: [],
    length: 0,
    nowPage: "",
    searchKey: "",
    action: "",
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      var url = "/laf?type=LOST";
      axios.get(`${url}`).then((res) =>
        this.setState({
          itemList: res.data,
          currentPage: "LOST",
          nowPage: 1,
          resultsPerPage: 9,
        })
      );
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ itemList: [] });
  }

  showFound = (e) => {
    e.preventDefault();
    this.setState({
      currentPage: "FOUND",
      nowPage: 1,
      searchKey: "",
      action: "",
    });
    var url = "/laf?type=FOUND";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  showLost = (e) => {
    e.preventDefault();
    this.setState({
      currentPage: "LOST",
      nowPage: 1,
      searchKey: "",
      action: "",
    });
    var url = "/laf?type=LOST";
    axios
      .get(`${url}`)
      .then((res) => this.setState({ itemList: res.data }))
      .then(console.log(this.state.itemList));
  };

  onChangeKey = (e) => {
    this.setState({ searchKey: e.target.value });
  };

  Duplicate(item, itemList) {
    for (var i = 0; i < itemList.length; i++) {
      if (item.id === itemList[i].id) {
        return true;
      }
    }
    return false;
  }

  search = (e) => {
    if (this._isMounted) {
      e.preventDefault();
      this.setState({
        itemList: [],
        tempList: [],
        action: "SEARCH",
        nowPage: 1,
      });
      var key = this.state.searchKey;
      var temp = `/messages/search?key=${key}&currentPage=${this.state.currentPage}`;
      axios.get(`${temp}`).then((res) => this.setState({ itemList: res.data }));

      var keyList = key.split(" ");
      for (var i = 0; i < keyList.length; i++) {
        console.log(keyList[i], i);
        temp = `/messages/search?key=${keyList[i]}&currentPage=${this.state.currentPage}`;
        axios.get(`${temp}`).then((res) => {
          if (res.data && res.data.length > 0) {
            for (var j = 0; j < res.data.length; j++) {
              if (this.Duplicate(res.data[j], this.state.itemList)) {
              } else {
                this.setState({
                  itemList: [...this.state.itemList, res.data[j]],
                });
              }
            }
          }
          console.log(res.data);
          console.log(this.state.tempList);
        });
      }
    }
    // var url = `/messages/search?key=${key}&currentPage=${this.state.currentPage}`;
    // axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  displayCreateButton(show) {
    if (show === "YES") {
      return (
        <PostItem
          itemType={this.state.currentPage}
          userInfo={this.props.userInfo}
          userType={this.props.userType}
        />
      );
    } else if (show === "COMPLETED") {
      return (
        <CompletedFilter
          showCompleted={this.props.showCompleted}
          filterCompletedLost={this.props.filterCompletedLost}
          filterCompletedFound={this.props.filterCompletedFound}
        />
      );
    } else {
      return "";
    }
  }
  displayItemButtons(user) {
    if (user === "ADMIN") {
      return (
        <AdminItemButtons
          showLost={this.showLost}
          showFound={this.showFound}
          showCompleted={this.props.showCompleted}
        />
      );
    } else {
      return (
        <StudentItemButtons
          showLost={this.showLost}
          showFound={this.showFound}
        />
      );
    }
  }
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
    const thisType = this.state.currentPage;
    var headingDescription = "";
    var show = "YES";
    var user = this.props.userType;
    var pages = Math.floor(
      this.state.itemList.length / this.state.resultsPerPage
    );
    var remainder = this.state.itemList.length % this.state.resultsPerPage;
    if (remainder != 0) {
      pages += 1;
    }
    var pageNumbers = [];
    for (var i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
    var end = this.state.resultsPerPage * this.state.nowPage;
    var start = this.state.resultsPerPage * (this.state.nowPage - 1);

    if (this.state.itemList.length <= 0 && this.state.action === "SEARCH") {
      headingDescription = "No Results Found.";
      show = "NO";
    } else if (this.state.action === "SEARCH") {
      headingDescription = `Showing results for "${this.state.searchKey}".`;
      show = "NO";
    } else if (thisType === "LOST") {
      headingDescription =
        "You can find lost items or give some information about them in this section.";
    } else if (thisType === "COMPLETED") {
      headingDescription = "You can find completed items here.";
      show = "COMPLETED";
    } else if (thisType === "MYITEMS") {
      headingDescription = "";
      show = "NO";
    } else {
      headingDescription =
        "You can find items that were found or give some information about them in this section.";
    }
    var searchPlaceHolder = `Search in ${this.state.currentPage}: Enter name, desciption or location`;

    return (
      <React.Fragment>
        <br />

        <div className="container center">
          <div className="row">
            <div className="col text-center">
              <div className="pill">
                <form
                  onSubmit={this.search}
                  className="nav justify-content-center"
                >
                  <div class="input-group mb-3" style={{ width: "450px" }}>
                    <input
                      onChange={this.onChangeKey}
                      value={this.state.searchKey}
                      type="text"
                      class="form-control"
                      placeholder={searchPlaceHolder}
                      required
                    />
                    <div class="input-group-append">
                      <button class="btn" type="submit">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                {this.displayItemButtons(user)}

                <br />

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="home">
                    <p>{headingDescription}</p>
                    {this.displayCreateButton(show)}

                    <br />
                    <br />

                    <div className="row">
                      <Items
                        items={this.state.itemList.slice(start, end)}
                        uid={this.props.uid}
                        thisType={thisType}
                        userType={this.props.userType}
                      />
                    </div>
                    <PageNumbers
                      pageNumbers={pageNumbers}
                      changePage={this.changePage}
                      currentPage={this.state.nowPage}
                      increasePage={this.increasePage}
                      decreasePage={this.decreasePage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ItemList;
