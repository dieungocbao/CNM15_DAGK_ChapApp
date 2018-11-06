import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


class ListUsers extends Component {
    static propTypes = {
        uid: PropTypes.string,
        email: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.object)
    }
    renderCategory(user) {
        return (
            <li className="cus-clearfix user-photo" key={user.id}>
                <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="img-responsive rounded-circle"
                />
                <div className="about">
                    <div className="name">{user.displayName}</div>
                    <div className="status">
                        <span><i className="fa fa-circle online" /> online</span>
                    </div>
                </div>
            </li>
        )
    }
    render() {
        let users = this.props.users
        users = users.filter(user => user.email !== this.props.email)
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