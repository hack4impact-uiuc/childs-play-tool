import React, { Component } from 'react'
import Tag from './Tag'
import '../styles/results.scss'
import Constants from '../utils/Constants'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: 'cardStyle'
    }
  }
  render() {
    return (
      <div className="resultsBox">
        <p
          className={this.state.hover}
          onMouseOver={e => this.setState({ hover: 'cardStyleHover' })}
          onMouseLeave={e => this.setState({ hover: 'cardStyle' })}
        >
          <div className="cardName" align="left">
            {this.props.game.name}
          </div>
          <div align="center">
            {/*this.props.game.tags ? this.buildTags(this.props.game.tags) : null*/}
            {/*<Tag type={'age'} tag={this.props.tags[0]} />
          <Tag type={'symptom'} tag={this.props.tags[1]} />*/}
          </div>
          <p>{this.props.game.description ? this.props.game.description : null}</p>
        </p>
      </div>
    )
  }
}

export default Card
