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
import './styles/htmlstyles.scss'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="heightDef">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/search" component={SearchPage} />
        <Route path="/results" component={Results} />
        <Route path="/description" component={Description} />
        <Route path="/directorPage" component={Password} />
        <Route path="/uploadPage" component={Update} />
        <br />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
