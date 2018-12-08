import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField, updateImageState } from '../redux/modules/searchpage'
import { updateResults, getSavedSearch, endLoading, beginLoading } from '../redux/modules/results'
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { getGames, getGamesByName } from '../utils/ApiWrapper'
import { updateConsole } from '../redux/modules/results'
import '../styles/searchpage.scss'
import { SearchPageStrings } from '../strings/english'

const mapStateToProps = state => ({
  system: state.searchpage.consoles,
  age: state.searchpage.ageRange,
  symptom: state.searchpage.symptoms,
  gender: state.searchpage.genders,
  name: state.searchpage.nameSearchField,
  selectedVal: state.searchpage.selectedSaveSearch,
  nameSearchField: state.searchpage.nameSearchField,
  noImage: state.searchpage.noImage
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField,
      updateResults,
      updateConsole,
      getSavedSearch,
      updateImageState,
      beginLoading,
      endLoading
    },
    dispatch
  )
}
class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      redirect: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleSubmit = () => {
    this.props.beginLoading()
    getGamesByName(this.props.nameSearchField).then(results => {
      this.props.updateResults({
        games: results,
        query: { search: this.props.nameSearchField }
      })
      if (results && Object.keys(results).length > 0) {
        this.props.updateConsole(Object.keys(results)[0])
      }
      this.props.endLoading()
    })
  }

  componentDidMount() {
    this.props.updateField('nameSearchField', '')
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="./results" />
    }
    return (
      <div className="background" style={{ paddingTop: window.innerWidth >= 550 ? '5%' : '20%' }}>
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <h3 className="homeText">
          {SearchPageStrings['title']}
          <br />
          {SearchPageStrings['subtitle']}
        </h3>
        <hr />
        <div className="searchPage">
          <Label for="nameSearch">{SearchPageStrings['nameSearchHeader']}</Label> <br />
          <div className="nameSearch">
            <SearchBarCustom
              fieldName="nameSearchField"
              onSubmit={e => {
                e.preventDefault()
                if (this.props.nameSearchField !== '') {
                  this.handleSubmit()
                  this.setState({ redirect: true })
                }
              }}
            />
          </div>
          <div className="nameSearch">
            <Link to={{ pathname: './results' }}>
              <Button
                className="right"
                onClick={this.handleSubmit}
                disabled={this.props.nameSearchField === ''}
              >
                {SearchPageStrings['nameSearchButton']}
              </Button>
            </Link>
          </div>
          <hr />
          <h>{SearchPageStrings['filterSearchHeader']}</h>
          <br />
          <div className="filterDropdown">
            <DropdownButton title={SearchPageStrings['age']} fieldName="ageRange" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title={SearchPageStrings['symptom']} fieldName="symptoms" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title={SearchPageStrings['console']} fieldName="consoles" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title={SearchPageStrings['gender']} fieldName="genders" />
          </div>
          <br />
          <Link
            to={
              this.props.age !== SearchPageStrings['age'] &&
              this.props.symptom !== SearchPageStrings['symptom']
                ? { pathname: '/results' }
                : { pathname: '/search' }
            }
          >
            <Button
              className="searchButton"
              onClick={
                this.props.age !== SearchPageStrings['age'] &&
                this.props.symptom !== SearchPageStrings['symptom']
                  ? e => {
                      this.props.beginLoading()
                      getGames(
                        this.props.age,
                        this.props.symptom,
                        this.props.system,
                        this.props.gender
                      ).then(results => {
                        this.props.updateResults({
                          games: results,
                          query: {
                            age: this.props.age,
                            symptom: this.props.symptom,
                            gender: this.props.gender
                          }
                        })
                        if (results && Object.keys(results).length > 0) {
                          this.props.updateConsole(Object.keys(results)[0])
                        }
                        this.props.endLoading()
                      })
                    }
                  : this.toggle
              }
            >
              {SearchPageStrings['filterSearchButton']}
            </Button>
          </Link>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>{SearchPageStrings['invalidSearch']}</ModalBody>
            <ModalFooter>
              <Button className="invalidSearchButton" onClick={this.toggle}>
                {SearchPageStrings['returnButton']}
              </Button>
            </ModalFooter>
          </Modal>
          <br />
          <div className="tinyText">{SearchPageStrings['reminder']}</div>
          <hr />
          <h> {SearchPageStrings['loadPrevHeader']} </h>
          <br />
          <div className="saveSearch">
            <DropdownButton
              title={SearchPageStrings['loadDropdown']}
              fieldName="selectedSaveSearch"
            />
          </div>
          <div className="saveSearch">
            <Link to={{ pathname: './results' }}>
              <Button
                className="searchButton"
                onClick={e => {
                  this.props.getSavedSearch(this.props.selectedVal)
                }}
              >
                {SearchPageStrings['loadButton']}
              </Button>
            </Link>
          </div>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={e => {
                  this.props.updateImageState()
                }}
                checked={this.props.noImage}
              />
              Search With No Images
            </Label>
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
