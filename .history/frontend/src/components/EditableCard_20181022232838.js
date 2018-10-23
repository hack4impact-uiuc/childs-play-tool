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
  buildTags = this.props.game.tags.map(t => <Tag type={t.type} tag={t.tag} />)
  this.state = {
        description: this.props.game.description
  }

  this.onInputChange = this.onInputChange.bind(this);
  onInputChange(e){
    this.setState({
       description:''


    });
  }

  render() {
    return (
      <p className="Card" style={cardStyle}>
        <div align="center" style={titleStyle}>
          {this.props.game.title}
        </div>
        <div align="right">{this.buildTags}</div>
        <input value={this.state.description}  className="form-control" type="text" name="title" ref="title" onChange={this.onInputChange}/>
        <p>{this.props.game.summary}</p>
        {this.props.game.description && <p>An in-depth description has been found.</p>}
        <Link to={{ pathname: './description', state: { game: this.props.game } }}>
          Go to description
        </Link>
      </p>
    )
  }
}

export default Card
