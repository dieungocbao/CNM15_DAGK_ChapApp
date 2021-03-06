import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'
import "./LogIn.css";

class LogIn extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
    firestore: PropTypes.shape({
      set: PropTypes.func.isRequired
    }).isRequired
  }

  onLogIn = () => {
    this.props.firebase.login({ provider: 'google', type: 'popup' })
      .then(res => {
        const user = res.profile.providerData[0]
        let date = new Date()
        let dateTime = date.getTime()
        dateTime = dateTime.toString()
        this.props.firestore.set(
          { collection: 'users', doc: user.uid },
          {
            userID: user.uid,
            uid: this.props.auth.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            status: true,
            lastOnline: dateTime
          }
        )
      })
  }
  onLogOut = () => {
    let date = new Date()
    let dateTime = date.getTime()
    dateTime = dateTime.toString()
    const user = this.props.auth.providerData[0]
    this.props.firestore.set(
      { collection: 'users', doc: user.uid },
      {
        userID: user.uid,
        uid: this.props.auth.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        status: false,
        lastOnline: dateTime
      }
    ).then(() => {
      this.props.firebase.logout()
    })
  }
  render() {
    if (!isLoaded(this.props.auth)) {
      return null
    }
    if (isEmpty(this.props.auth)) {
      return (
        <div>
          <div className="text-center login">
            <p>Please click button below to sign in!</p>
            <button className="btn btn-danger" onClick={this.onLogIn}>
              <i className="fa fa-google" />
              Log In With Google
          </button>
          </div>
        </div>
      )
    }
    return (
      <div className="text-center logout">
        <button className="btn btn-danger" onClick={this.onLogOut}>Log Out</button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}
const mapDispatchToProps = {
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(),
  firestoreConnect()
)(LogIn)