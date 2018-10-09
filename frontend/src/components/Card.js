import React, { Component } from 'react'
import Tag from './Tag'
import Description from './Description'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
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
  buildTags = this.props.tags.map(t => <Tag type={t.type} tag={t.tag} />)
  render() {
    return (
      <div>
        <br />
        <div className="Card" style={cardStyle}>
          <div align="center" style={titleStyle}>
            {this.props.title}
          </div>
          <div align="right">{this.buildTags}</div>
          <p>{this.props.summary}</p>
          {this.props.description && <div>An in-depth description has been found.</div>}
          <Route exact path="/description" component={Description} />
          <Link to={{ pathname: './description' }}>Go to description</Link>
        </div>
        <br />
      </div>
    )
  }
}

export default Card

/*
 Pass results to a result page component. Result page renders Card components. (/Results)
 Card components redirect to Description component.
 Results redux used by cards and descriptions.
*/
