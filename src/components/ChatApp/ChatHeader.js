import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class ChatHeader extends Component {
    static propTypes = {
        auth: PropTypes.object,
        firestore: PropTypes.shape({
            set: PropTypes.func.isRequired,
            delete: PropTypes.func.isRequired
        }).isRequired,
        markUsers: PropTypes.arrayOf(PropTypes.object),
    }

    getMark = (uid) => {
        let user1 = this.props.auth.uid
        let user2 = uid
        user1 = user1.slice(0, 5)
        user2 = user2.slice(0, 5)
        let roomKey = user1 + user2
        let check = -1
        this.props.listMarkUser.map(mark => {
            return (mark.markUser === uid) ? check = 0 : null
        })
        if (check === 0) {
            this.props.firestore.delete({ collection: 'markUsers', doc: roomKey })
        } else {
            this.props.firestore.set(
                { collection: 'markUsers', doc: roomKey },
                {
                    markUser: uid,
                    uid: this.props.auth.uid
                }
            )
        }
    }
    render() {
        let isMark = false
        this.props.listMarkUser.map(mark => {
            return (mark.markUser === this.props.getUserChat.uid) ? isMark = true : null
        })
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
                <i className={(isMark === true) ? "fa fa-star yellow" : "fa fa-star"} onClick={() => this.getMark(this.props.getUserChat.uid)} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        markUsers: state.firestore.ordered.markUsers ? state.firestore.ordered.markUsers.map(c => c) : [],
    }
}
const mapDispatchToProps = {}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.uid) return []
        return [
            {
                collection: 'markUsers',
                doc: props.uid
            }
        ]
    }
    )
)(ChatHeader)