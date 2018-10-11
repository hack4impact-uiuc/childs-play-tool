import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class Password extends Component {
  render() {
    return (
      <div className="Password">
        <form>
          <label>
            Key:
            <input />
          </label>
          <Link to="/uploadPage">
            <button type="submit">Submit</button>
          </Link>
        </form>
      </div>
    )
  }
}

export default Password
