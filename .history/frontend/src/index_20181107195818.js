import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import {
  Counter,
  Password,
  SearchPage,
  SearchBarCustom,
  Dropdown,
  Update,
  Results,
  Description
} from './components'
import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './redux/configureStore'
import { loadState } from './redux/localStorage'
import './styles/styles.scss'
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="rootHeight">
        <Route className="rootHeight" exact path="/" component={SearchPage} />
        <Route className="rootHeight" path="/results" component={Results} />
        <Route className="rootHeight" path="/description" component={Description} />
        <Route className="rootHeight" path="/directorPage" component={Password} />
        <Route className="rootHeight" path="/uploadPage" component={Update} />
        <br />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
