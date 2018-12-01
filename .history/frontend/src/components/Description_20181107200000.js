import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Tag from './Tag'
import '../styles/description.scss'

const titleStyle = {
  fontSize: '30px'
}

class Description extends Component {
  render() {
    return (
      <div className="rootHeight">
        <div className="background">
          <div className="white-box">
            <div className="description-cardName">{this.props.location.state.game.name}</div>
            <div align="center">
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
            <Link to={{ pathname: './results' }}>
              <Button outline color="success">
                Return to results
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Tag type={'age'} tag={this.props.location.state.tags[0]} />
          <Tag type={'symptom'} tag={this.props.location.state.tags[1]} />
        </div>
        <div>
          <p>{this.props.location.state.game.description}</p>
          <br />
          <Link to={{ pathname: './results' }}>Return to results</Link>
        </div>
      </div>
    )
  }
}

export default Description
