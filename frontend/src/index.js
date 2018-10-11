import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
// import './styles/index.css'
import { Counter, Results } from './components'
import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './redux/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Counter} />
        <Route exact path="/" component={Results} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
