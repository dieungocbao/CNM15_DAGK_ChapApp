import React, { Component } from "react";
import "./ChatApp.css";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import MainUser from "./MainUser";
import ChatHeader from "./ChatHeader";
import ListUsers from "./ListUsers";
import ChatHistory from "./ChatHistory";
import ChatBox from "./ChatBox";

class ChatApp extends Component {
  static propTypes = {
    auth: PropTypes.object,
    uid: PropTypes.string
  }
  state = {
    getUserChat: null,
    roomChat: ''
  }
  getUser = (user, room) => {
    this.setState({ getUserChat: user, roomChat: room })
  }
  render() {
    if (!this.props.uid) return null
    return (
      <div>
        <div className="cus-container cus-clearfix">
          <div className="people-list" id="people-list">
            <div className="search">
              <input type="text" placeholder="search" />
              <i className="fa fa-search" />
            </div>
            <MainUser />
            <hr />
            <ListUsers getUser={this.getUser} />
          </div>
          <div className="chat">
            <ChatHeader />
            {this.state.getUserChat ? <ChatHistory getUserChat={this.state.getUserChat} roomChat={this.state.roomChat}/> : ''}
            <ChatBox roomChat={this.state.roomChat}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    uid: state.firebase.auth.uid
  }
}
const mapDispatchToProps = {}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(ChatApp)