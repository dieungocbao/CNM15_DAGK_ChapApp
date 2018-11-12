import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class MainUser extends Component {
    static propTypes = {
        auth: PropTypes.object
    }
    render() {
        return (
            <div className="main-user cus-clearfix user-photo">
                <img
                    src={this.props.auth.photoURL}
                    alt="photo_avatar"
                    className="img-responsive rounded-circle"
                />
                <div className="about">
                    <div className="name">{this.props.auth.displayName}</div>
                </div>
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
)(MainUser)