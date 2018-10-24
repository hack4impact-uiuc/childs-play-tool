import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'
import Dropzone from 'react-dropzone'

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
class EditableCard extends Component {
    constructor(props){
        super(props);
        this.state =  {
          description: this.props.game.description,
          files: [] //this.props.game.picture  
      };
    }

  buildTags = this.props.game.tags.map(t => <Tag type={t.type} tag={t.tag} />)

handleInputChange(e) {
    this.setState({
        description: e.target.value
    });
  }

  handleSubmit(event) {
    alert('Edit submitted: ' + this.state.description);
    event.preventDefault();
    //here's where the info would update
  }

  render() {
    return (
      <p className="Card" style={cardStyle}>
        <div align="center" style={titleStyle}>
          {this.props.game.title}
        </div>
        <div align="right">{this.buildTags}</div>
        <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" value={this.state.description} onChange={e => this.handleInputChange(e)}/>
            <input type="submit" value="Submit"/>   
        </form>
        <Link to={{ pathname: './description', state: { game: this.props.game } }}>
          Go to description
        </Link>
      </p>
    )
  }
}

export default EditableCard
