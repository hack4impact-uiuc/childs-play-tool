import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Tag from './Tag'
import Update from './Update'
import { editGame } from '../utils/ApiWrapper'
import { editGameState } from '../redux/modules/results'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DescriptionStrings } from '../strings/english'
import '../styles/description.scss'

const titleStyle = {
  fontSize: '30px'
}

const mapStateToProps = state => ({
  auth: state.auth.authenticated,
  currentConsole: state.results.currentConsole,
  noImage: state.searchpage.noImage
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editGameState
    },
    dispatch
  )
}

class Description extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      imageUploadURL: this.props.location.state.game.image,
      updateDescription: this.props.location.state.game.description
    }
  }

  render() {
    let descriptionRender
    let imageRender
    let editButton
    let saveButton
    if (this.state.editing) {
      descriptionRender = (
        <div
          className="editing-card-description"
          contentEditable={this.state.editing}
          onBlur={e => {
            this.setState({ updateDescription: e.target.innerHTML })
            console.log(this.state.updateDescription)
          }}
        >
          {this.props.location.state.game.description}
        </div>
      )

      imageRender = (
        <Form className="search">
          <FormGroup>
            <Label for="exampleSearch">{DescriptionStrings['imageURL']}</Label>
            <Input
              type="textarea"
              name="imageURL"
              id="imageURL"
              defaultValue={this.props.location.state.game.image}
              onChange={e => {
                this.setState({ imageUploadURL: e.target.value })
                console.log(this.state.imageUploadURL)
              }}
            />
          </FormGroup>
        </Form>
      )
    } else {
      descriptionRender = (
        <div>
          {this.state.updateDescription
            ? this.state.updateDescription
            : DescriptionStrings['noDesc']}
        </div>
      )
      imageRender = (
        <img
          className="image"
          src={
            !this.props.noImage
              ? this.props.location.state.game.image == ''
                ? require('../styles/placeholderimage.png')
                : this.props.location.state.game.image
              : null
          }
        />
      )
    }

    if (this.props.auth) {
      editButton = (
        <Button
          className="editing-button"
          color="info"
          disabled={this.state.editing}
          onClick={() => {
            this.setState({ editing: true })
          }}
        >
          {DescriptionStrings['editButton']}
        </Button>
      )
      saveButton = (
        <Button
          className="editing-button"
          color="info"
          disabled={!this.state.editing}
          onClick={() => {
            this.setState({ editing: false })
            this.props.editGameState(
              this.props.currentConsole,
              this.props.location.state.game.id,
              this.state.updateDescription,
              this.state.imageUploadURL
            )
            editGame(
              this.props.location.state.game.id,
              this.state.updateDescription,
              this.state.imageUploadURL
            )
          }}
        >
          {DescriptionStrings['saveButton']}
        </Button>
      )
    } else {
      editButton = null
      saveButton = null
    }

    return (
      <div>
        <div className="description-background">
          <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
          <div className="white-box">
            <div className="description-cardName">{this.props.location.state.game.name}</div>

            {imageRender}
            {descriptionRender}

            <br />
            <br />
            <div align="center">
              {this.props.location.state.game.gender &&
              this.props.location.state.game.gender != DescriptionStrings['noGender'] ? (
                <Tag type={'gender'} tag={this.props.location.state.game.gender} />
              ) : null}
              {this.props.location.state.game.tags.ages ? (
                this.props.location.state.game.tags.ages.length == 2 ? (
                  <Tag type={'age'} tag={DescriptionStrings['allAges']} />
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
            <br />

            {editButton}
            {saveButton}

            <Link to={{ pathname: './results' }}>
              <Button outline color="success">
                {DescriptionStrings['return']}
              </Button>
            </Link>
          </div>
          <br />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description)
