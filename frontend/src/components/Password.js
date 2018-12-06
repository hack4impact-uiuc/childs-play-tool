import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styles from '../styles/password.scss'
import { Button } from 'reactstrap'
import { login } from '../redux/modules/auth'
import { PasswordStrings } from '../strings/english'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login
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
  }

  render() {
    return (
      <div className="passwordPageBackground">
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <div className="passwordPage">
          <p> {PasswordStrings["greeting"]} </p>
          <form onSubmit={this.authenticate}>
            <label className="passwordEnter">
              <span> {PasswordStrings["key"]} </span>
              <input className="inputKey" onChange={this.changedKey} />
            </label>
            <Link to="/uploadPage">
              <Button className="searchButton" type="submit" onClick={this.authenticate}>
                {PasswordStrings["submitButton"]}
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
