import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class ChatHistory extends Component {
    static propTypes = {
        uid: PropTypes.string,
        email: PropTypes.string,
        displayName: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object)
    }
    renderMessage(message, index) {
        return (
            (message.uid === this.props.uid ?
                <li className="cus-clearfix" key={index}>
                    <div className="message-data align-right">
                        <span className="message-data-time">10:10 AM, Today</span>
                        &nbsp; &nbsp;
                        <span className="message-data-name">{this.props.displayName}</span>
                        &nbsp;
                        <i className="fa fa-circle me" />
                    </div>
                    <div className="message other-message float-right">
                        {message.message}
                    </div>
                </li>
                :
                <li className="cus-clearfix" key={index}>
                    <div className="message-data">
                        <span className="message-data-name">
                            <i className="fa fa-circle online" /> {this.props.getUserChat.displayName}
                        </span>
                        {/* <span className="message-data-time">10:20 AM, Today</span> */}
                    </div>
                    <div className="message my-message">
                        {message.message}
                    </div>
                </li>
            )

        )
    }
    render() {
        const filterMessages = this.props.messages.filter((message) => message.room === this.props.roomChat)
        const listMessages = filterMessages.map(
            (message, index) => this.renderMessage(message, index)
        )
        return (
            <div>
                <div className="chat-history">
                    <ul>
                        {listMessages}
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        email: state.firebase.auth.email,
        displayName: state.firebase.auth.displayName,
        messages: state.firestore.ordered.messages ? state.firestore.ordered.messages.map(c => c) : [],
    }
}
const mapDispatchToProps = {}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.uid) return []
        return [
            {
                collection: 'messages'
            }
        ]
    }
    )
)(ChatHistory)
