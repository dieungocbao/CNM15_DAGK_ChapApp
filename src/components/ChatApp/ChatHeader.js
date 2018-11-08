import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class ChatHeader extends Component {
    static propTypes = {
        auth: PropTypes.object
    }
    render() {
        return (
            <div className="chat-header cus-clearfix">
                <img
                    src={this.props.getUserChat.avatarUrl}
                    alt="avatar"
                    className="img-responsive rounded-circle"
                />
                <div className="chat-about">
                    <div className="chat-with">Chat with {this.props.getUserChat.displayName}</div>
                </div>
                <i className="fa fa-star" />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = {}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(),
)(ChatHeader)