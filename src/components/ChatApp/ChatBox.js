import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'


class ChatBox extends Component {
    static propTypes = {
        uid: PropTypes.string,
        profile: PropTypes.object,
        firestore: PropTypes.shape({
            set: PropTypes.func.isRequired
        }).isRequired,
        firebase: PropTypes.shape({ // comes from firebaseConnect
            uploadFile: PropTypes.func.isRequired
        })
    }
    state = {
        chatMessage: '',
        imageLink: null,
        imageFile: null,
        downloadURL: null,
        fileClick: false,
    }
    addChatMessage() {
        let date = new Date()
        let dateTime = date.getTime()
        dateTime = dateTime.toString()
        this.props.firestore.set(
            { collection: 'messages', doc: dateTime },
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
        let date = new Date()
        let dateTime = date.getTime()
        dateTime = dateTime.toString()
        this.props.firestore.set(
            { collection: 'messages', doc: dateTime },
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
    fileSelectedHandler = e => {
        this.setState({
            imageFile: e.target.files[0]
        })
    }
    uploadFile = () => {
        const { imageFile } = this.state
        let downloadURL = null
        this.props.firebase.uploadFile('images', imageFile)
            .then(res => {
                res.uploadTaskSnapshot.ref.getDownloadURL()
                    .then(result => {
                        if (result) {
                            return Promise.all(downloadURL = result)
                        }
                    })
                    .then(() => {
                        if (downloadURL) {
                            let date = new Date()
                            let dateTime = date.getTime()
                            dateTime = dateTime.toString()
                            this.props.firestore.set(
                                { collection: 'messages', doc: dateTime },
                                {
                                    message: downloadURL,
                                    uid: this.props.uid,
                                    room: this.props.roomChat,
                                    type: 'image'
                                }
                            )
                        }
                    })
            })


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
                    <i className="fa fa-file-o" data-toggle="modal" data-target="#uploadModal" /> &nbsp;&nbsp;&nbsp;

                    <i className="fa fa-file-image-o" data-toggle="modal" data-target="#linkModal" />

                    {/* Link modal */}
                    <div className="modal fade" id="linkModal" tabIndex={-1} role="dialog" aria-labelledby="linkModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="linkModal">Insert image link</h5>
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

                    {/* Upload Modal */}
                    <div className="modal fade" id="uploadModal" tabIndex={-1} role="dialog" aria-labelledby="uploadModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="uploadModal">Upload image file</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input type="file" onChange={this.fileSelectedHandler} accept="image/*" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.uploadFile}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <button className="send" onClick={() => this.addChatMessage()}>Send</button>
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
    firebaseConnect(),
)(ChatBox)