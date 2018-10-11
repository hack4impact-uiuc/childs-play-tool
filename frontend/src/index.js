import React from 'react'
//mport 'react-bootstrap';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
// import './styles/index.css'
import { Counter } from './components'
import { Password } from './components'
import { SearchPage, Dropdown } from './components'
import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './redux/configureStore'
import { Update } from './components'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/directorPage" component={Password} />
        <Route path="/uploadPage" component={Update} />
        <Route exact path="/" component={SearchPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
