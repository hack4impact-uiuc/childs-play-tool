import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'

const titleStyle = {
  fontSize: '30px'
}

class Description extends Component {
  render() {
    return (
      <div className="Description">
        <div align="center" style={titleStyle}>
          {this.props.location.state.game.title}
        </div>
        <div>
          {this.props.location.state.game.tags.map(t => (
            <Tag type={t.type} tag={t.tag} />
          ))}
          <br />
          <br />
          {this.props.location.state.game.summary}
        </div>
        <br />
        {this.props.location.state.game.description}
        <br />
        <br />
        <Link to={{ pathname: './results' }}>Return to results</Link>
      </div>
    )
  }
}

export default Description
