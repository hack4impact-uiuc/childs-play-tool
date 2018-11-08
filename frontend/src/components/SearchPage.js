import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults, getSavedSearch } from '../redux/modules/results'
import { Button } from 'reactstrap'
import { getGames, getGamesByName } from '../utils/ApiWrapper'
import '../styles/styles.scss'

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
  render() {
    return (
      <div>
        <body className="background">
          <h3 className="homeText">
            Hello! Welcome to the Child&#39;s Play Game Finder. You can search a game by name or
            filter by inputs.
          </h3>
          <SearchBarCustom fieldName="nameSearchField" />
          <Link to={{ pathname: './Results' }}>
            <Button
              className="right"
              onClick={e =>
                getGamesByName(this.props.nameSearchField).then(results =>
                  this.props.updateResults(results)
                )
              }
            >
              Search By Name
            </Button>
          </Link>
          <DropdownButton title="Console Type" fieldName="consoles" />
          <DropdownButton title="Age*" fieldName="ageRange" />
          <DropdownButton title="Symptom*" fieldName="symptoms" />
          <DropdownButton title="Main Character Gender" fieldName="genders" />
          <Link to={{ pathname: './Results' }}>
            <Button
              className="searchButton"
              color="blue"
              onClick={e =>
                getGames(
                  this.props.age,
                  this.props.symptom,
                  this.props.system,
                  this.props.gender
                ).then(results => this.props.updateResults(results))
              }
            >
              Search By Filter
            </Button>
          </Link>
          <br />
          <h> Load Previous Search </h>
          <DropdownButton title="Saved Searches" fieldName="selectedSaveSearch" />
          <Link to={{ pathname: './Results' }}>
            <Button
              color="blue"
              onClick={e => {
                this.props.updateResults(this.props.getSavedSearch(this.props.selectedVal))
                console.log(this.props.getSavedSearch(this.props.selectedVal))
              }}
            >
              Load saved search
            </Button>
          </Link>
          <Link className="loginLink" to={{ pathname: './directorPage' }}>
            <Button className="adminButton">Admin Login</Button>
          </Link>
        </body>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
