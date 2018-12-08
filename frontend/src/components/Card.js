import React, { Component } from 'react'
import Tag from './Tag'
import '../styles/results.scss'
import '../styles/card.scss'
import Constants from '../utils/Constants'
import { CardStrings } from '../strings/english'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: 'cardStyle',
      description:
        !this.props.game.description || this.props.game.description.length == 0
          ? CardStrings['noDesc']
          : this.props.game.description && this.props.game.description.length > 100
            ? this.props.game.description.substring(0, 99) + CardStrings['ellipsis']
            : this.props.game.description
    }
  }
  render() {
    return (
      <html
        className={this.props.noImage ? 'cardStyleNoImage' : this.state.hover}
        onMouseOver={e => this.setState({ hover: 'cardStyleHover' })}
        onMouseLeave={e => this.setState({ hover: 'cardStyle' })}
      >
        <div align="center">
          <div className={this.props.noImage ? 'cardNameNoImage' : 'cardName'}>
            {this.props.game.name}
          </div>
          {!this.props.noImage ? (
            <img
              className="imageCard"
              src={
                this.props.game.image == ''
                  ? require('../styles/placeholderimage.png')
                  : this.props.game.image
              }
            />
          ) : null}
          <br />
          <br />
          <div className={this.props.noImage ? 'tagBoxNoImage' : 'tagBox'}>
            {this.props.game.gender && this.props.game.gender !== CardStrings['noGender'] ? (
              <Tag type={'gender'} tag={this.props.game.gender} card={true} />
            ) : null}
            {this.props.game.tags ? (
              this.props.game.tags.ages.length === 2 ? (
                <Tag type={'age'} tag={CardStrings['allAges']} card={true} />
              ) : (
                <Tag type={'age'} tag={this.props.game.tags.ages[0]} card={true} />
              )
            ) : null}
            {this.props.game.tags
              ? this.props.game.tags.symptoms.map(t => <Tag type={'symptom'} tag={t} card={true} />)
              : null}
            {!this.props.game.current ? <Tag type={'old'} tag={'Old'} /> : null}
          </div>
          <br />
          <p className="cardDescription">
            {this.state.description ? this.state.description : null}
          </p>
        </div>
      </html>
    )
  }
}

export default Card
