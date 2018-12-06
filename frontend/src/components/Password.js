import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styles from '../styles/password.scss'
import { Button } from 'reactstrap'
import { login, loadUpdates } from '../redux/modules/auth'
import { getUpdates } from '../utils/ApiWrapper'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  updates: state.auth.updates
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      loadUpdates
    },
    dispatch
  )
}
class Password extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: ''
    }
  }

  changedKey = event => {
    this.setState({ key: event.target.value })
  }

  authenticate = event => {
    this.props.login(this.state.key)
    getUpdates().then(results => {
      this.props.loadUpdates(results)
    })
  }

  render() {
    return (
      <div className="passwordPageBackground">
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <div className="passwordPage">
          <p> Welcome Administrators. Enter your key to continue: </p>
          <form onSubmit={this.authenticate}>
            <label className="passwordEnter">
              <span> Key: </span>
              <input className="inputKey" onChange={this.changedKey} />
            </label>
            <Link to="/uploadPage">
              <Button className="searchButton" type="submit" onClick={this.authenticate}>
                Submit
              </Button>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Password)
