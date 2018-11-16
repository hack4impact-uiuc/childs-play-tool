import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Tag from './Tag'
import '../styles/description.scss'

const titleStyle = {
  fontSize: '30px'
}

class Description extends Component {
  buildTags = (tags, type) => tags.map(t => <Tag type={type} tag={t} />)
  render() {
    return (
      <div>
        <div className="description-background">
          <div className="white-box">
            <div className="description-cardName">{this.props.location.state.game.name}</div>
            <img className="image" src={this.props.location.state.game.image} />
            <br/><br/>
            <div align="center">
              {this.props.location.state.game.gender &&
              this.props.location.state.game.gender != 'No Discernable Gender' ? (
                <Tag type={'gender'} tag={this.props.location.state.game.gender} />
              ) : null}
              {this.props.location.state.game.tags
                ? this.buildTags(this.props.location.state.game.tags.ages, 'age')
                : null}
              {this.props.location.state.game.tags
                ? this.buildTags(this.props.location.state.game.tags.symptoms, 'symptom')
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
