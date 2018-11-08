import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults, getSavedSearch } from '../redux/modules/results'
import { Button } from 'reactstrap'
import { getGames, getGamesByName } from '../utils/ApiWrapper'
// import '../styles/styles.scss'
import '../styles/searchpage.scss'

const mapStateToProps = state => ({
  system: state.searchpage.consoles,
  age: state.searchpage.ageRange,
  symptom: state.searchpage.symptoms,
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
      <body className="background">
        <link
          href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro"
          rel="stylesheet"
        />
        <h3 className="homeText">
          Child&#39;s Play
          <br />
          Game Finder
        </h3>
        <div className="searchPage">
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
          <hr />
          <div className="filterDropdown">
            <DropdownButton title="Age*" fieldName="ageRange" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title="Symptom*" fieldName="symptoms" />
          </div>
          <div className="filterDropdown">
            <DropdownButton title="Console Type" fieldName="consoles" />
          </div>
          <br />
          <Link to={{ pathname: './Results' }}>
            <Button
              className="searchButton"
              color="blue"
              onClick={e =>
                getGames(this.props.age, this.props.symptom, this.props.system).then(results =>
                  this.props.updateResults(results)
                )
              }
            >
              Search By Filter
            </Button>
          </Link>
          <hr />
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
          <hr />
          <Link className="loginLink" to={{ pathname: './directorPage' }}>
            <Button className="adminButton">Admin Login</Button>
          </Link>
        </div>
      </body>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
