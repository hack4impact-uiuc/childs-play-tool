import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Counter, Description, Update } from './components'
import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './redux/configureStore'

const store = configureStore()
let title = 'Mario Kart'
let summary = 'A racing game'
let description = 'A racing game with Mario'
let tags = ['0-5', 'Switch', 'Pain']
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Counter} />
        <Description title={title} tags={tags} summary={summary} description={description} />
        <Route exact path="/" component={Update} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
