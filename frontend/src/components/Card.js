import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'

const cardStyle = {
  color: 'black',
  border: '2px solid #52e3e5',
  borderRadius: '25px',
  width: '350px',
  padding: '10px',
  fontFamily: 'Arial'
}
const titleStyle = {
  fontSize: '30px'
}
class Card extends Component {
  buildTags = this.props.game.tags.map(t => <Tag type={t.type} tag={t.tag} />)
  render() {
    return (
      <div>
        <br />
        <div className="Card" style={cardStyle}>
          <div align="center" style={titleStyle}>
            {this.props.game.title}
          </div>
          <div align="right">{this.buildTags}</div>
          <p>{this.props.game.summary}</p>
          {this.props.game.description && <div>An in-depth description has been found.</div>}
          <Link to={{ pathname: './description', state: { title: this.props.game.title } }}>
            Go to description
          </Link>
        </div>
        <br />
      </div>
    )
  }
}

export default Card

/*
  Search results passed to results redux state.
    This is used by the results page component (render cards).
    This is also accessed by description component to pick the right game.
  Router path: index > results (with cards) > description
*/
