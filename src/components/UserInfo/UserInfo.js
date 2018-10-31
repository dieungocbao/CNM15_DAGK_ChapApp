import React, { Component } from "react";
import "./UserInfo.css";

export default class UserInfo extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="user-info">
          <p>{this.props.user.displayName}</p>
          <p>{this.props.user.email}</p>
          <img src={this.props.user.photoURL} alt="photo_avatar" className="img-responsive rounded-circle"/>
        </div>
        <button className="btn btn-danger" onClick={this.props.onLogOut}>Log Out</button>
      </div>
    );
  }
}
