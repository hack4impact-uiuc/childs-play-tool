import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Tag extends Component {
  render() {
    return (
      <div className="Tag">
        <p>{this.props.tag}</p>
      </div>
    )
  }
}

export default Tag
