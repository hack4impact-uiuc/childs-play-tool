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
    constructor(props){
        super(props);
        this.state =  {
          description: this.props.game.description  
      };
    }

  buildTags = this.props.game.tags.map(t => <Tag type={t.type} tag={t.tag} />)

handleInputChange(e) {
    this.setState({
        description: e.target.value
    });
  }

  render() {
    return (
      <p className="Card" style={cardStyle}>
        <div align="center" style={titleStyle}>
          {this.props.game.title}
        </div>
        <div align="right">{this.buildTags}</div>
        <form onSubmit={this.props.changed}>
            <input type="text" value={this.state.description} onChange={e => this.handleInputChange(e)}/>
            <input type="submit" value="Submit"/>   
        </form>
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
