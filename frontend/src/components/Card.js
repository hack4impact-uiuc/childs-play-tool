import React, { Component } from 'react'
import Tag from './Tag'
const cardStyle = {
  color: "black",
  border: "2px solid #52e3e5",
  borderRadius: "25px",
  width: "350px",
  padding: "10px",
  fontFamily: "Arial"
};
const titleStyle = {
  fontSize: "30px"
};
class Card extends Component {
  buildTags = this.props.tags.map(t => <Tag type={t.type} tag={t.tag} />)
  render() {
    return (
      <div>
        <br />
        <div className = "Card" style = {cardStyle}>
          <div align = "center" style = {titleStyle}>{this.props.title}</div>
          <div align="right">{this.buildTags}</div>
          <p>{this.props.summary}</p>
          {this.props.description && <div>An in-depth description has been found.</div>}
        </div>
        <br />
      </div>
    )
  }
}

export default Card
