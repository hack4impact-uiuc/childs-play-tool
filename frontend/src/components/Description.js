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
      <div>
        <div className="description-background">
          <div className="white-box">
            <div className="description-cardName">{this.props.location.state.game.name}</div>
            <div align="center">
              {this.props.location.state.game.gender &&
              this.props.location.state.game.gender != 'No Discernable Gender' ? (
                <Tag type={'gender'} tag={this.props.location.state.game.gender} />
              ) : null}
              {this.props.location.state.game.tags.ages ? (
                this.props.location.state.game.tags.ages.length == 2 ? (
                  <Tag type={'age'} tag={'All Ages'} />
                ) : (
                  <Tag type={'age'} tag={this.props.location.state.game.tags.ages[0]} />
                )
              ) : null}
              {this.props.location.state.game.tags.symptoms
                ? this.props.location.state.game.tags.symptoms.map(t => (
                    <Tag type={'symptom'} tag={t} />
                  ))
                : null}

              <br />
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
      </div>
    )
  }
}

export default Description
