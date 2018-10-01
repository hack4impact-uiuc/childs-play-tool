// @flow
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import configureStore, { history } from './store/configureStore'
import { App, Colors, Navbar } from './components'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Navbar />
        <Route exact path="/" component={App} />
        <Route path="/colors" component={Colors} />
      </div>
    </ConnectedRouter>
  </Provider>,
  (document.getElementById('root'): any)
)

registerServiceWorker()
