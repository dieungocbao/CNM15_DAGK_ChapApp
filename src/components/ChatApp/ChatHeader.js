import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class ChatHeader extends Component {
    static propTypes = {
        auth: PropTypes.object,
        usersByPerson: PropTypes.arrayOf(PropTypes.object),
        firestore: PropTypes.shape({
            set: PropTypes.func.isRequired
        }).isRequired
    }
    // getMark = (uid) => {
    //     let users = this.props.usersByPerson[0].users
    // }
    render() {
        return (
            <div className="chat-header cus-clearfix">
                <img
                    src={this.props.getUserChat.photoURL}
                    alt="avatar"
                    className="img-responsive rounded-circle"
                />
                <div className="chat-about">
                    <div className="chat-with">Chat with {this.props.getUserChat.displayName}</div>
                </div>
                <i className="fa fa-star" onClick={() => this.getMark(this.props.getUserChat.uid)} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        usersByPerson: state.firestore.ordered.usersByPerson ? state.firestore.ordered.usersByPerson.map(c => c) : []
    }
}
const mapDispatchToProps = {}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.uid) return []
        return [
            {
                collection: 'usersByPerson',
                where: [
                    ['uid', '==', props.uid]
                ]
            }
        ]
    })
)(ChatHeader)