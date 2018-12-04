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
  Description,
  NavBar,
  ResultsLink,
  LandingPage
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
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/results" component={Results} />
        <Route path="/description" component={Description} />
        <Route path="/directorPage" component={Password} />
        <Route path="/uploadPage" component={Update} />
        <Route path="/resultsLink" component={ResultsLink} />
        <br />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
