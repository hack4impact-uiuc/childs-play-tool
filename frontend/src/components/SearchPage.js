import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults, getSavedSearch } from '../redux/modules/results'
import { Button, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { getGames, getGamesByName } from '../utils/ApiWrapper'
import '../styles/searchpage.scss'

const mapStateToProps = state => ({
  system: state.searchpage.consoles,
  age: state.searchpage.ageRange,
  symptom: state.searchpage.symptoms,
  gender: state.searchpage.genders,
  name: state.searchpage.nameSearchField,
  selectedVal: state.searchpage.selectedSaveSearch,
  nameSearchField: state.searchpage.nameSearchField
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField,
      updateResults,
      getSavedSearch
    },
    dispatch
  )
}
class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <div className="background">
        <link
          href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro"
          rel="stylesheet"
        />
        <h3 className="homeText">
          Child&#39;s Play
          <br />
          Therapeutic Video Game Guide
        </h3>
        <div className="searchPage">
          <Label for="nameSearch">Search By Name</Label> <br/>
          <div className="nameSearch">
            <SearchBarCustom fieldName="nameSearchField" />
          </div>
          <div className="nameSearch">
            <Link to={{ pathname: './Results' }}>
              <Button
                className="right"
                onClick={e =>
                  getGamesByName(this.props.nameSearchField).then(results =>
                    this.props.updateResults({
                      games: results,
                      query: { search: this.props.nameSearchField }
                    })
                  )
                }
              >
                Search
              </Button>
            </Link>
          </div>
          <hr />
          <h>Search By Filter</h>
          <br />
          <div className="filterDropdown">
            <DropdownButton title="Age*" fieldName="ageRange" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title="Symptom*" fieldName="symptoms" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title="Console Type" fieldName="consoles" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title="Character Gender" fieldName="genders" />
          </div>
          <br />
          <Link
            to={
              this.props.age != 'Age*' && this.props.symptom != 'Symptom*'
                ? { pathname: './Results' }
                : ''
            }
          >
            <Button
              className="searchButton"
              color="blue"
              onClick={
                this.props.age != 'Age*' && this.props.symptom != 'Symptom*'
                  ? e =>
                      getGames(
                        this.props.age,
                        this.props.symptom,
                        this.props.system,
                        this.props.gender
                      ).then(results =>
                        this.props.updateResults({
                          games: results,
                          query: {
                            age: this.props.age,
                            symptom: this.props.symptom,
                            gender: this.props.gender
                          }
                        })
                      )
                  : this.toggle
              }
            >
              Search
            </Button>
          </Link>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>Invalid Search! Age and Symptom are required fields.</ModalBody>
            <ModalFooter>
              <Button className="invalidSearchButton" onClick={this.toggle}>
                Return
              </Button>
            </ModalFooter>
          </Modal>
          <br />
          <div className="tinyText">* = required field</div>
          <hr />
          <h> Load Previous Search </h>
          <br />
          <div className="saveSearch">
            <DropdownButton title="Saved Searches" fieldName="selectedSaveSearch" />
          </div>
          <div className="saveSearch">
            <Link to={{ pathname: './Results' }}>
              <Button
                color="blue"
                onClick={e => {
                  this.props.getSavedSearch(this.props.selectedVal)
                }}
              >
                Load saved search
              </Button>
            </Link>
          </div>
          <hr />
          <Link className="loginLink" to={{ pathname: './directorPage' }}>
            <Button className="adminButton">Admin Login</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
