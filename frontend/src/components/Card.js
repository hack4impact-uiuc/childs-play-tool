import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'

const cardStyle = {
  color: 'black',
  fontFamily: 'Arial',
  border: '2px solid #52e3e5',
  borderRadius: '25px',
  margin: '10px',
  padding: '10px',
  display: 'inline-block'
}
const titleStyle = {
  fontSize: '30px'
}
class Card extends Component {
  buildTags = tags => tags.map(t => <Tag type={t.type} tag={t.tag} />)
  render() {
    return (
      <p className="Card" style={cardStyle}>
        <div align="center" style={titleStyle}>
          {this.props.game.name}
        </div>
        <div align="right">
          {this.props.game.tags ? this.buildTags(this.props.game.tags) : null}
        </div>
        <p>{this.props.game.summary ? this.props.game.summary : null}</p>
        {this.props.game.description && (
          <Link to={{ pathname: './description', state: { game: this.props.game } }}>
            Go to description
          </Link>
        )}
      </p>
    )
  }
}

export default Card
