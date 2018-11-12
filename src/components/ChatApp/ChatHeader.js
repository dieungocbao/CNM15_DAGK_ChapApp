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
    state = {
        isMark: false
    }
    getMark = (uid, markUsers) => {
        if (markUsers.markUser) {
            if (markUsers.markUser.length > 0) {
                let check = -1
                markUsers.markUser.map(mark => {
                    return (mark.markUser === uid) ? check = 0 : ''
                })
                if (check === 0) {
                    let temp = markUsers.markUser.filter(mark => {
                        return mark.markUser !== uid
                    })
                    this.props.firestore.delete({ collection: 'markUsers', doc: this.props.auth.uid })
                    this.props.firestore.set(
                        { collection: 'markUsers', doc: this.props.auth.uid },
                        {
                            markUser: temp
                        }
                    )
                } else {
                    let temp = markUsers.markUser
                    let mark = {
                        markUser: uid,
                        uid: this.props.auth.uid
                    }
                    temp.push(mark)
                    this.props.firestore.set(
                        { collection: 'markUsers', doc: this.props.auth.uid },
                        {
                            markUser: temp
                        }
                    )
                }
            } else {
                if (markUsers.markUser.markUser === uid) {
                    this.props.firestore.delete({ collection: 'markUsers', doc: this.props.auth.uid })
                }
                else {
                    let temp = []
                    temp.push(markUsers.markUser)
                    let mark = {
                        markUser: uid,
                        uid: this.props.auth.uid
                    }
                    temp.push(mark)
                    this.props.firestore.set(
                        { collection: 'markUsers', doc: this.props.auth.uid },
                        {
                            markUser: temp
                        }
                    )
                }
            }
        } else {
            let mark = {
                markUser: uid,
                uid: this.props.auth.uid
            }
            this.props.firestore.set(
                { collection: 'markUsers', doc: this.props.auth.uid },
                {
                    markUser: mark
                }
            )
        }
    }
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
                <i className="fa fa-star" onClick={() => this.getMark(this.props.getUserChat.uid, this.props.listMarkUser)} />
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