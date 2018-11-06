import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "../../store/store"
import LogIn from '../LogIn/LogIn';
import ChatApp from '../ChatApp/ChatApp';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <LogIn />
          <ChatApp />
        </div>
      </Provider>
    )
  }
}

export default App