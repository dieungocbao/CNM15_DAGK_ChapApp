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
        console.log(this.props.auth)
        return (
            <div>
                <img
                    src={this.props.auth.photoURL}
                    alt="photo_avatar"
                    className="img-responsive rounded-circle"
                />
                <div className="about">
                    <div className="name">{this.props.auth.displayName}</div>
                    <div className="status">
                        <span><i className="fa fa-circle online" /> online</span>
                    </div>
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