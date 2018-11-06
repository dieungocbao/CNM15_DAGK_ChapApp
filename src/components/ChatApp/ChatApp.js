import React, { Component } from "react";
import "./ChatApp.css";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import MainUser from "./MainUser";

class ChatApp extends Component {
  static propTypes = {
    uid: PropTypes.strng
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
            <div className="main-user cus-clearfix user-photo">
              <MainUser />
            </div>
            <hr />
            <ul className="list">
              {/* {
                this.props.users.map((user, index) => {
                  return (
                    <li className="cus-clearfix user-photo" key={index}>
                      <img
                        src={user.profile_picture}
                        alt="avatar"
                        className="img-responsive rounded-circle"
                      />
                      <div className="about">
                        <div className="name">{user.displayName}</div>
                        <div className="status">
                          {(user.isActive) ? <span><i className="fa fa-circle online" /> online</span> : <span><i className="fa fa-circle offline" /> offline</span>}
                        </div>
                      </div>
                    </li>
                  )
                })
              } */}
            </ul>
          </div>
          <div className="chat">
            <div className="chat-header cus-clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                alt="avatar"
              />
              <div className="chat-about">
                <div className="chat-with">Chat with Vincent Porter</div>
                <div className="chat-num-messages">already 1 902 messages</div>
              </div>
              <i className="fa fa-star" />
            </div>{" "}
            {/* end chat-header */}
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
    uid: state.firebase.auth.uid
  }
}
const mapDispatchToProps = {}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(ChatApp)