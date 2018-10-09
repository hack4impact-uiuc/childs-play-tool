import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Password extends Component {
  render() {
    return (
      <div className="Password">
        <form>
          <label>
            Key:
            <input />
          </label>
          <button type="button">Submit</button>
        </form>
      </div>
    )
  }
}

export default Password
