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
    calculateOfflineTime = (timeOffline) => {
        let date = new Date()
        let dateTime = date.getTime()
        let temp = parseInt(dateTime, 10) - parseInt(timeOffline, 10)
        return timeConversion(temp) + ' '
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
                                <span className="offline-time">
                                    {this.calculateOfflineTime(user.lastOnline)}
                                    ago
                                </span>
                            </span>}
                    </div>
                </div>
            </li>
        )
    }
    checkMarkUser = (uid) => {
        let check = -1
        this.props.listMarkUser.map(mark => {
            return (mark.markUser === uid) ? check = 0 : null
        })
        if (check === 0) {
            return true
        } else return false
    }
    render() {
        let users = this.props.users
        users = users.filter(user => user.email !== this.props.email)
        if (this.props.searchName) {
            users = users.filter(user => user.displayName.toLowerCase().indexOf(this.props.searchName) !== -1)
        }
        let onlineUsers = []
        let offlineUsers = []
        let markUsers = []
        users.map(user => {
            this.checkMarkUser(user.uid)
            if (this.checkMarkUser(user.uid) === true) {
                if (user.status === true) {
                    markUsers.push(user)
                } else {
                    offlineUsers.push(user)
                }
            } else {
                if (user.status === false) {
                    offlineUsers.push(user)
                } else {
                    onlineUsers.push(user)
                }
            }
            return true
        })
        // console.log('mark')
        // console.log(markUsers)
        // console.log('online')
        // console.log(onlineUsers)
        // console.log('offline')
        // console.log(offlineUsers)
        users = [...markUsers, ...onlineUsers, ...offlineUsers]
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

function timeConversion(millisec) {

    var seconds = (millisec / 1000).toFixed(0);

    var minutes = (millisec / (1000 * 60)).toFixed(0);

    var hours = (millisec / (1000 * 60 * 60)).toFixed(0);

    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

    if (seconds < 60) {
        return seconds + " seconds";
    } else if (minutes < 60) {
        return minutes + " minutes";
    } else if (hours < 24) {
        return hours + " hours";
    } else {
        return days + " days"
    }
}