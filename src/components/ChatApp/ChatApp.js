import React, { Component } from "react";
import "./css/ChatApp.css";
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
    searchName: null,
    getUserChat: null,
    roomChat: ''
  }
  getUser = (user, room) => {
    this.setState({ getUserChat: user, roomChat: room })
  }
  onhandleChange = (e) => {
    this.setState({
      searchName: e.target.value
    })
  }
  render() {
    if (!this.props.uid) return null
    return (
      <div>
        <div className="cus-container cus-clearfix">
          <div className="people-list" id="people-list">
            <div className="search">
              <input type="text" placeholder="search" onChange={this.onhandleChange} />
              <i className="fa fa-search" />
            </div>
            <MainUser />
            <hr />
            <ListUsers getUser={this.getUser} searchName={this.state.searchName} />
          </div>
          <div className="chat">
            {(this.state.getUserChat === null) ? <div className="no-chat">Click user on user list to start chat</div> : ''}
            {this.state.getUserChat ? <ChatHeader getUserChat={this.state.getUserChat} /> : ''}
            {this.state.getUserChat ? <ChatHistory getUserChat={this.state.getUserChat} roomChat={this.state.roomChat} /> : ''}
            {this.state.getUserChat ? <ChatBox roomChat={this.state.roomChat} /> : ''}
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