import React, { Component } from "react";
import "./LogIn.css";

export default class LogIn extends Component {
  render() {
    return (
      <div>
        <div className="text-center oauth">
          <p>Please click button below to sign in!</p>
          <button className="btn btn-danger" onClick={this.props.onLogIn}>
            <i className="fa fa-google" />
            Log In With Google
          </button>
        </div>
      </div>
    );
  }
}
