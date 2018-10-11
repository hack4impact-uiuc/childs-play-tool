import React from 'react'
//mport 'react-bootstrap';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
<<<<<<< HEAD
import { Counter, Results, Description } from './components'
=======
//import './styles/index.css'
import { SearchPage, Dropdown } from './components'
>>>>>>> 801b68ded5b3a1120a1508353a0dc7d9031fb753
import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './redux/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
<<<<<<< HEAD
        <Route exact path="/" component={Counter} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/description" component={Description} />
        <br />
=======
        <Route exact path="/" component={SearchPage} />
>>>>>>> 801b68ded5b3a1120a1508353a0dc7d9031fb753
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
