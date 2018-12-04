import React, { Component } from 'react'
import Tag from './Tag'
import '../styles/results.scss'
import '../styles/card.scss'
import Constants  from '../utils/Constants'

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
      <html
        className={this.state.hover}
        onMouseOver={e => this.setState({ hover: 'cardStyleHover' })}
        onMouseLeave={e => this.setState({ hover: 'cardStyle' })}
      >
        <table display="flex">
          <tr className="cardLeft">
            <div className="cardName">{this.props.game.name}</div>
            {this.props.game.gender && this.props.game.gender !== 'No Discernable Gender' ? (
              <Tag type={'gender'} tag={this.props.game.gender} />
            ) : null}
            {this.props.game.tags ? (
              this.props.game.tags.ages.length === 2 ? (
                <Tag type={'age'} tag={'All Ages'} />
              ) : (
                <Tag type={'age'} tag={this.props.game.tags.ages[0]} />
              )
            ) : null}
            {this.props.game.tags
              ? this.props.game.tags.symptoms.map(t => <Tag type={'symptom'} tag={t} />)
              : null}
          </tr>
          <tr className="cardRight">
            <img className="imageCard" src={this.props.game.image} />
          </tr>
        </table>
        <br />
        <br />
        <p className="cardDescription">{this.state.description ? this.state.description : null}</p>
      </html>
    )
  }
}

export default Card
