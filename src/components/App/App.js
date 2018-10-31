import React, { Component } from "react";
import LogIn from "../LogIn/LogIn";
import UserInfo from "../UserInfo/UserInfo";
import firebase, { auth, provider } from "../../firebase/firebaseConnect";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: "",
      username: "",
      items: [],
      user: null // <-- add this line
    };
  }
  onLogIn = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  };
  onLogOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <div className="container">
          <div className="App-header">
            <h1 className="text-center">Dang nhap bang Google</h1>
          </div>
          {user ? (
            <UserInfo onLogOut={this.onLogOut} user={user}/>
          ) : (
            <LogIn onLogIn={this.onLogIn} />
          )}
        </div>
      </div>
    );
  }
}
