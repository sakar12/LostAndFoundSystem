import React, { Component } from "react";
import ItemList from "./ItemList";
import axios from "axios";
import MyItem from "./MyItem";
import { Redirect } from "react-router";

export default class MyItems extends Component {
  state = {
    uid: 1,
    myList: [],
    currentPage: "LOST",
    action: "",
    searchKey: "",
  };
  _isMounted = false;

  showLost = (e) => {
    e.preventDefault();
    if (this.props.userType === "ADMIN") {
      var url = `/messages/myItems?uid=ADMIN&type=LOST`;
      axios
        .get(`${url}`)
        .then((res) =>
          this.setState({ myList: res.data, currentPage: "LOST" })
        );
    } else {
      var uid = this.props.userInfo.student_id;
      var url = `/messages/myItems?uid=${uid}&type=LOST`;
      axios
        .get(`${url}`)
        .then((res) =>
          this.setState({ myList: res.data, currentPage: "LOST" })
        );
    }
  };

  showFound = (e) => {
    e.preventDefault();
    if (this.props.userType === "ADMIN") {
      var url = `/messages/myItems?uid=ADMIN&type=FOUND`;
      axios
        .get(`${url}`)
        .then((res) =>
          this.setState({ myList: res.data, currentPage: "FOUND" })
        );
    } else {
      var uid = this.props.userInfo.student_id;
      var url = `/messages/myItems?uid=${uid}&type=FOUND`;
      axios
        .get(`${url}`)
        .then((res) =>
          this.setState({ myList: res.data, currentPage: "FOUND" })
        );
    }
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
      this.setState({ myList: [], action: "SEARCH" });
      var key = this.state.searchKey;
      const userInfo = JSON.parse(localStorage.getItem("sessionData"));
      var uid = userInfo.student_id;
      if (this.props.userType === "ADMIN") {
        uid = "ADMIN";
      }
      var temp = `/messages/searchMyItem?key=${key}&currentPage=${this.state.currentPage}&uid=${uid}`;
      axios.get(`${temp}`).then((res) => this.setState({ myList: res.data }));

      var keyList = key.split(" ");
      for (var i = 0; i < keyList.length; i++) {
        console.log(keyList[i], i);
        temp = `/messages/searchMyItem?key=${keyList[i]}&currentPage=${this.state.currentPage}&uid=${uid}`;
        axios.get(`${temp}`).then((res) => {
          if (res.data && res.data.length > 0) {
            for (var j = 0; j < res.data.length; j++) {
              if (this.Duplicate(res.data[j], this.state.myList)) {
              } else {
                this.setState({
                  myList: [...this.state.myList, res.data[j]],
                });
              }
            }
          }
          console.log(res.data);
          console.log(this.state.myList);
        });
      }
    }
    // var url = `/messages/search?key=${key}&currentPage=${this.state.currentPage}`;
    // axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  displayMyItem() {
    return this.state.myList.map((myItem) => (
      <MyItem
        key={myItem.item_id}
        myItem={myItem}
        userType={this.props.userType}
        userInfo={this.props.userInfo}
      />
    ));
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ searchKey: "" });
    if (this.props.userType === "ADMIN") {
      var url = `/messages/myItems?uid=ADMIN&type=LOST`;
      axios
        .get(`${url}`)
        .then((res) =>
          this.setState({ myList: res.data, currentPage: "LOST" })
        );
    } else {
      const userInfo = JSON.parse(localStorage.getItem("sessionData"));
      var uid = userInfo.student_id;
      var url = `/messages/myItems?uid=${uid}&type=LOST`;
      axios
        .get(`${url}`)
        .then((res) =>
          this.setState({ myList: res.data, currentPage: "LOST" })
        );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ myList: [] });
  }

  render() {
    var bottomGap = {
      marginTop: "300px",
    };
    var headerMessage = "";
    if (this.state.myList.length <= 0 && this.state.action === "SEARCH") {
      headerMessage = "No Results Found.";
    } else if (this.state.action === "SEARCH") {
      headerMessage = `Showing results for "${this.state.searchKey}".`;
    }
    var searchPlaceHolder = `Search in My Items/${this.state.currentPage}`;
    if (this.state.myList.length > 0) {
      bottomGap = {
        marginTop: "0px",
      };
    }
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
                  <div class="input-group mb-3" style={{ width: "350px" }}>
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
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <button
                      onClick={this.showLost}
                      class="btn"
                      id="pillbtnlost"
                    >
                      Lost Items
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      onClick={this.showFound}
                      class="btn"
                      id="pillbtnfound"
                    >
                      Found Items
                    </button>
                  </li>
                </ul>
                <br />
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="home">
                    <p>{headerMessage}</p>
                    <div className="row" style={{ marginTop: "20px" }}>
                      {this.displayMyItem()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={bottomGap}></div>
      </React.Fragment>
    );
  }
}
