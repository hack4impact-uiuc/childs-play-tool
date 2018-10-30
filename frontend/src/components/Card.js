import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'
import styles from '../styles/styles.css'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: 'cardStyle'
    }
  }
  buildTags = tags =>
    tags.map(t => (t.type.toLowerCase() != 'system' ? <Tag type={t.type} tag={t.tag} /> : null))
  render() {
    return (
      <p
        className={this.state.hover}
        onMouseOver={e => this.setState({hover: 'cardStyleHover'})}
        onMouseLeave={e => this.setState({hover: 'cardStyle'})}
      >
        <div className="cardName" align="center">
          {this.props.game.name}
        </div>
        <div align="right">
          {this.props.game.tags ? this.buildTags(this.props.game.tags) : null}
        </div>
        <p>{this.props.game.summary ? this.props.game.summary : null}</p>
      </p>
    )
  }
}

export default Card
