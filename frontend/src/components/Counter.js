import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { increment, reset, set } from '../redux/modules/counter'
import '../styles/Counter.css'

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment,
      reset,
      set
    },
    dispatch
  )
}

class Counter extends Component {
  render() {
    const { count } = this.props.counter.count
    return (
      <div className="Counter">
        <p className="Counter-intro">Count: {this.props.counter.count}</p>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.reset}>Reset</button>
        <button onClick={() => this.props.set(this.state.newCount)}>Set</button>
        <br /> <br />
        <input onChange={event => this.setState({ newCount: parseInt(event.target.value) })} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
