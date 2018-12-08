import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, withRouter } from 'react-router'
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

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location &&
      !(
        this.props.location.pathname === '/results' &&
        prevProps.location.pathname === '/description'
      ) &&
      !(
        this.props.location.pathname === '/description' &&
        prevProps.location.pathname === '/results'
      ) &&
      !(this.props.location.pathname === '/' && this.props.location.hash !== '')
    ) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}
const TopScroll = withRouter(ScrollToTop)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <TopScroll>
        <div className="heightDef">
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/results" component={Results} />
          <Route path="/description" component={Description} />
          <Route path="/directorPage" component={Password} />
          <Route path="/uploadPage" component={Update} />
          <Route path="/resultsLink" component={ResultsLink} />
        </div>
      </TopScroll>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
