import React, { Component } from 'react'
import Tag from './Tag'
import '../styles/card.scss'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: 'cardStyle',
      description:
        this.props.game.description && this.props.game.description.length > 100
          ? this.props.game.description.substring(0, 99) + '...'
          : this.props.game.description
    }
  }
  render() {
    return (
      <p
        className={this.state.hover}
        onMouseOver={e => this.setState({ hover: 'cardStyleHover' })}
        onMouseLeave={e => this.setState({ hover: 'cardStyle' })}
      >
        <div className="cardName" align="left">
          {this.props.game.name}
        </div>
        <img className="image" src={this.props.game.image} />
        <br />
        <br />
        <div align="center">
          {this.props.game.gender && this.props.game.gender != 'No Discernable Gender' ? (
            <Tag type={'gender'} tag={this.props.game.gender} />
          ) : null}
          {this.props.game.tags ? (
            this.props.game.tags.ages.length == 2 ? (
              <Tag type={'age'} tag={'All Ages'} />
            ) : (
              <Tag type={'age'} tag={this.props.game.tags.ages[0]} />
            )
          ) : null}
          {this.props.game.tags
            ? this.props.game.tags.symptoms.map(t => <Tag type={'symptom'} tag={t} />)
            : null}
        </div>
        <p>{this.state.description ? this.state.description : null}</p>
      </p>
    )
  }
}

export default Card
