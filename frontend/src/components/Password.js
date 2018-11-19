import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styles from '../styles/styles.scss'
import { Button } from 'reactstrap'
import { login } from '../redux/modules/auth'

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
        <div className="passwordPage">
          <p> Welcome Administrators. Enter your key to continue: </p>
          <form>
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
