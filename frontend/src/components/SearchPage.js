import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults, getSavedSearch } from '../redux/modules/results'
import { Button } from 'reactstrap'
import { getGames } from '../utils/ApiWrapper'
import '../styles/styles.scss'
import '../styles/searchpage.scss'

const mapStateToProps = state => ({
  system: state.searchpage.consoles,
  age: state.searchpage.ageRange,
  symptom: state.searchpage.symptoms,
  name: state.searchpage.nameSearchField,
  selectedVal: state.searchpage.selectedSaveSearch
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
      <link href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro" rel="stylesheet"></link>
        <h3 className="homeText">
          Child&#39;s Play
          <br></br>
          Game Finder
        </h3>
        <div className="searchPage">
          <SearchBarCustom fieldName="nameSearchField" />
          <Link to={{ pathname: './Results' }}>
            <Button
              className="right"
              onClick={e =>
                getGames(this.props.age, this.props.symptom, this.props.system).then(results =>
                  this.props.updateResults(results)
                )
              }
            >
              Search By Name
            </Button>
          </Link>
          <hr></hr>
          <DropdownButton title="Console Type" fieldName="consoles" />
          <DropdownButton title="Age" fieldName="ageRange" />
          <DropdownButton title="Symptom" fieldName="symptoms" />
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
          <hr></hr>
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
          <hr></hr>
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
