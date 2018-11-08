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
        chatMessage: '',
        imageLink: null
    }
    addChatMessage() {
        this.props.firestore.add(
            { collection: 'messages' },
            {
                message: this.state.chatMessage,
                uid: this.props.uid,
                room: this.props.roomChat,
                type: 'text'
            }
        )
        this.setState({ chatMessage: '' })
        this.refs.chatbox.value = ''
    }
    handleChange = (e) => {
        this.setState({
            imageLink: e.target.value
        })
    }
    onSaveLink = () => {
        this.props.firestore.add(
            { collection: 'messages' },
            {
                message: this.state.imageLink,
                uid: this.props.uid,
                room: this.props.roomChat,
                type: 'image'
            }
        )
        this.setState({ imageLink: null })
        this.refs.imagelink.value = ''
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

                    <i className="fa fa-file-image-o" data-toggle="modal" data-target="#exampleModal" />
                    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Insert image link</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" onChange={this.handleChange} placeholder="Link..." ref="imagelink" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onSaveLink}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="send" onClick={() => this.addChatMessage()}>Send</button>
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