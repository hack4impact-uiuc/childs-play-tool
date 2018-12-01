import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styles from '../styles/styles.scss'

class Password extends Component {
  render() {
    return (
      <body className="background">
      <div className="passwordPage">
        <p> Welcome Administrators. Enter your key to continue: </p>
        <form>
          <label className="passwordEnter">
            <span> Key: </span>
            <input className="inputKey" />
          </label>
          <Link to="/uploadPage">
            <button className="searchButton" type="submit">
              Submit
            </button>
          </Link>
        </form>
      </div>
      </body>
    )
  }
}

export default Password
