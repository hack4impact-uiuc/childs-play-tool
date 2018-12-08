import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import '../styles/password.scss'
import '../styles/styles.scss'
import { Button } from 'reactstrap'
import { login, loadUpdates, beginLoading, endLoading } from '../redux/modules/auth'
import { getUpdates } from '../utils/ApiWrapper'
import { PasswordStrings } from '../strings/english'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  updates: state.auth.updates
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      loadUpdates,
      beginLoading,
      endLoading
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
    this.props.beginLoading()
    getUpdates().then(results => {
      this.props.loadUpdates(results)
      this.props.endLoading()
    })
  }

  render() {
    return (
      <div
        className="passwordPageBackground"
        style={{ paddingTop: window.innerWidth >= 550 ? '5%' : '20%' }}
      >
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <div className="passwordPage">
          <p> {PasswordStrings['greeting']} </p>
          <form onSubmit={this.authenticate}>
            <label className="passwordEnter">
              <span> {PasswordStrings['key']} </span>
              <input className="inputKey" onChange={this.changedKey} />
            </label>
            <Link to="/uploadPage">
              <Button className="searchButton" type="submit" onClick={this.authenticate}>
                {PasswordStrings['submitButton']}
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
