import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Card from './Card'

const mapStateToProps = state => ({
  results: state.results.games
})

class Results extends Component {
  buildCards = this.props.results.map(c => <Card game={c} />)
  render() {
    return (
      <div>
        {this.buildCards}
        <br/>
        <Link to={{ pathname: './' }}>Go to home</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Results)
