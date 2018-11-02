import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults, getSavedSearch } from '../redux/modules/results'
import { Button } from 'reactstrap'
import { getGames } from '../utils/ApiWrapper'

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
      <div>
        <SearchBarCustom fieldName="nameSearchField" />
        <Link to={{ pathname: './Results' }}>
          <Button
            color="blue"
            onClick={e =>
              getGames(this.props.age, this.props.symptom, this.props.system).then(results =>
                this.props.updateResults(results)
              )
            }
          >
            Search By Name
          </Button>
        </Link>
        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Symptom" fieldName="symptoms" />
        <Link to={{ pathname: './Results' }}>
          <Button
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
        <h> Admin Login: </h>
        <Link to={{ pathname: './directorPage' }}>Login</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
