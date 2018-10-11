import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Tag from './Tag'

const mapStateToProps = state => ({
  results: state.results.games
})

const descStyle = {}
const titleStyle = {
  fontSize: '30px'
}
let game = 0
class Description extends Component {
  getGame = () => {
    for (let i = 0; i < this.props.results.length; i++) {
      if (this.props.results[i].title === this.props.location.state.title) {
        game = this.props.results[i]
        break
      }
    }
  }
  render() {
    return (
      <div className="Description" style={descStyle}>
        {this.getGame()}
        <div align="center" style={titleStyle}>
          {game.title}
        </div>
        <div>
          {game.tags.map(t => (
            <Tag type={t.type} tag={t.tag} />
          ))}
          <br />
          <br />
          {game.summary}
        </div>
        <br />
        {game.description}
        <br /><br/>
        <Link to={{ pathname: './results' }}>
          Return to results
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Description)
