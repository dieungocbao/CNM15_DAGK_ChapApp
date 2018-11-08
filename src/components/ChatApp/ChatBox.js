import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class ChatBox extends Component {
    static propTypes = {
        uid: PropTypes.string,
        firestore: PropTypes.shape({
            add: PropTypes.func.isRequired
        }).isRequired
    }
    state = {
        chatMessage: ''
    }
    addChatMessage() {
        this.props.firestore.add(
            { collection: 'messages' },
            {
                message: this.state.chatMessage,
                uid: this.props.uid,
                room: this.props.roomChat
            }
        )
        this.setState({ chatMessage: '' })
        this.refs.chatbox.value = ''
    }
    render() {
        return (
            <div>
                <div className="chat-message cus-clearfix">
                    <textarea
                        name="message-to-send"
                        id="message-to-send"
                        placeholder="Type your message"
                        rows={3}
                        ref="chatbox"
                        onChange={(evt) => this.setState({ chatMessage: evt.target.value })}
                    />
                    <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o" />
                    <button onClick={() => this.addChatMessage()}>Send</button>
                </div>
            </div>
        )
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
)(ChatBox)