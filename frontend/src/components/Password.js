import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



class Counter extends Component {
  render() {
    const { count } = this.props.counter.count
    return (
      <div className="Password">
        
      </div>
    )
  }
}

export default (Counter)
