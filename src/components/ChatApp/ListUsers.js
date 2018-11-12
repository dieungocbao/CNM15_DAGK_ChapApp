import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './css/ListUsers.css'

class ListUsers extends Component {
    static propTypes = {
        uid: PropTypes.string,
        email: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.object),
        firestore: PropTypes.shape({
            set: PropTypes.func.isRequired
        }).isRequired
    }

    getUser = (uid) => {
        let user1 = this.props.uid
        let user2 = uid
        user1 = user1.slice(0, 5)
        user2 = user2.slice(0, 5)
        let roomKey
        if (user1 < user2) {
            roomKey = user1 + user2
        } else if (user1 > user2) {
            roomKey = user2 + user1
        }
        this.props.firestore.set(
            { collection: 'rooms', doc: roomKey },
            {
                room: roomKey
            }
        )
        let user = this.props.users.filter(user => user.uid === uid)
        this.props.getUser(user[0], roomKey)
    }
   
    renderCategory(user) {
        return (
            <li className="cus-clearfix user-photo" key={user.id} onClick={() => this.getUser(user.uid)}>
                <img
                    src={user.photoURL}
                    alt="avatar"
                    className="img-responsive rounded-circle"
                />
                <div className="about">
                    <div className="name">{user.displayName}</div>
                    <div className="status">
                        {(user.status === true)
                            ?
                            <span><i className="fa fa-circle online" /> online</span>
                            :
                            <span>
                                <i className="fa fa-circle offline" /> offline
                            </span>}
                    </div>
                </div>
            </li>
        )
    }
    render() {
        let users = this.props.users
        users = users.filter(user => user.email !== this.props.email)
        if (this.props.searchName) {
            users = users.filter(user => user.displayName.toLowerCase().indexOf(this.props.searchName) !== -1)
        }
        const listUsers = users.map(
            (user) => this.renderCategory(user)
        )
        return (
            <div>
                <ul className="list">
                    {listUsers}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        email: state.firebase.auth.email,
        users: state.firestore.ordered.users ? state.firestore.ordered.users.map(c => c) : [],
    }
}
const mapDispatchToProps = {}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.uid) return []
        return [
            {
                collection: 'users'
            }
        ]
    })
)(ListUsers)