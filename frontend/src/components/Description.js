import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Tag from './Tag'
import '../styles/description.scss'

const titleStyle = {
  fontSize: '30px'
}

class Description extends Component {
constructor(props) {
  super(props)
  this.state = {
    editing: false,
    updateTitle: ''
  }
}
  render() {
    return (
      <div>
        <div className="description-background">
          <div className="white-box">


            <div className="description-cardName" contentEditable={this.state.editing}
            onBlur={e => {
                    console.log(e.target.innerHTML)
                    this.setState({ updateTitle: e.target.innerHTML })
            }}
            >
            {this.props.location.state.game.name}
            </div>


            <img className="image" src={this.props.location.state.game.image} />
            <br />
            <br />
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
            <Button color="info" disabled={this.state.editing} onClick={() => {
                this.setState({ editing: true })
                console.log(this.state.editing)
              }}>
              Edit
            </Button>
            <Button color="info" disabled={!this.state.editing} onClick={() => {
                this.setState({ editing: false })
                console.log(this.state.editing)
              }}>
              Save
            </Button>
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
