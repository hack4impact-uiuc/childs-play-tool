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
          {this.props.location.state.game.name}
        </div>
        <div>
          <Tag type={'age'} tag={this.props.location.state.tags[0]} />
          <Tag type={'symptom'} tag={this.props.location.state.tags[1]} />
        </div>
        <p>{this.props.location.state.game.description}</p>
        <br />
        <Link to={{ pathname: './results' }}>Return to results</Link>
      </div>
    )
  }
}

export default Description
