import React, { Component } from "react";
import "./ChatApp.css";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import MainUser from "./MainUser";
import ChatHeader from "./ChatHeader";
import ListUsers from "./ListUsers";

class ChatApp extends Component {
  static propTypes = {
    auth: PropTypes.object,
    uid: PropTypes.string
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
            <ListUsers />
          </div>
          <div className="chat">
            <ChatHeader />

            <div className="chat-history">
              <ul>
                <li className="cus-clearfix">
                  <div className="message-data align-right">
                    <span className="message-data-time">10:10 AM, Today</span>{" "}
                    &nbsp; &nbsp;
                    <span className="message-data-name">Olia</span>{" "}
                    <i className="fa fa-circle me" />
                  </div>
                  <div className="message other-message float-right">
                    Hi Vincent, how are you? How is the project coming along?
                  </div>
                </li>
                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online" /> Vincent
                    </span>
                    <span className="message-data-time">10:20 AM, Today</span>
                  </div>
                  <div className="message my-message">
                    Actually everything was fine. I'm very excited to show this
                    to our team.
                  </div>
                </li>
                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online" /> Vincent
                    </span>
                    <span className="message-data-time">10:31 AM, Today</span>
                  </div>
                  <i className="fa fa-circle online" />
                  <i
                    className="fa fa-circle online"
                    style={{ color: "#AED2A6" }}
                  />
                  <i
                    className="fa fa-circle online"
                    style={{ color: "#DAE9DA" }}
                  />
                </li>
              </ul>
            </div>
            <div className="chat-message cus-clearfix">
              <textarea
                name="message-to-send"
                id="message-to-send"
                placeholder="Type your message"
                rows={3}
                defaultValue={""}
              />
              <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
              <i className="fa fa-file-image-o" />
              <button>Send</button>
            </div>
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