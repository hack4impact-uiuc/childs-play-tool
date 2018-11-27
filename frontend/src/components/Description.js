import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Tag from './Tag'
import Update from './Update'
import '../styles/description.scss'

const titleStyle = {
  fontSize: '30px'
}

class Description extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      imageUploadURL: '',
      updateDescription: ''
    }
  }

  render() {
    let descriptionRender
    let imageRender
    if (this.state.editing) {
      descriptionRender = (
        <div
          className="editing-card-description"
          contentEditable={this.state.editing}
          onBlur={e => {
            this.setState({ updateDescription: e.target.innerHTML })
          }}
        >
          {this.props.location.state.game.description}
        </div>
      )

      imageRender = (
        <Form className="search">
          <FormGroup>
            <Label for="exampleSearch">Image URL</Label>
            <Input
              type="textarea"
              name="imageURL"
              id="imageURL"
              placeholder="Type URL here..."
              onChange={e => {
                this.setState({ imageUploadURL: e.target.value })
              }}
            />
          </FormGroup>
        </Form>
      )
    } else {
      descriptionRender = (
        <div
          className="card-description"
          contentEditable={this.state.editing}
          onBlur={e => {
            this.setState({ updateDescription: e.target.innerHTML })
          }}
        >
          {this.props.location.state.game.description}
        </div>
      )

      imageRender = <img className="image" src={this.props.location.state.game.image} />
    }

    return (
      <div>
        <div className="description-background">
          <div className="white-box">
            <div className="description-cardName">{this.props.location.state.game.name}</div>

            {imageRender}

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

            {descriptionRender}

            <br />
            <Button
              className="editing-button"
              color="info"
              disabled={this.state.editing}
              onClick={() => {
                this.setState({ editing: true })
              }}
            >
              Edit
            </Button>
            <Button
              className="editing-button"
              color="info"
              disabled={!this.state.editing}
              onClick={() => {
                this.setState({ editing: false })
              }}
            >
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
