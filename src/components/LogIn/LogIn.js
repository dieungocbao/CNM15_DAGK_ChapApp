import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import "./LogIn.css";

class LogIn extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  }
  render() {
    if (!isLoaded(this.props.auth)) {
      return null
    }
    if (isEmpty(this.props.auth)) {
      return (
        <div>
          <button
            onClick={
              () => this.props.firebase.login({ provider: 'google', type: 'popup' })
            }
          >Log in with Google</button>
        </div>
      )
    }
    return <button
      style={{ width: "20rem" }}
      onClick={() => this.props.firebase.logout()}
    > Logout</button>

  }
}
const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}
const mapDispatchToProps = {
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(LogIn)
