import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults } from '../redux/modules/results'
import axios from 'axios'
import { Button } from 'reactstrap'

const mapStateToProps = state => ({
  system: state.searchpage.consoles,
  age: state.searchpage.ageRange,
  symptom: state.searchpage.symptoms,
  name: state.searchpage.nameSearchField
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField,
      updateResults
    },
    dispatch
  )
}

function getGames(age, symptom, system) {
  return axios
    .get(
      'http://localhost:8080/games' + '?age=' + age + '&symptom=' + symptom + '&system=' + system
    )
    .then(response => {
      console.log(
        'http://localhost:8080/games' + '?age=' + age + '&symptom=' + symptom + '&system=' + system
      )
      return response.data.result.games
    })
    .catch(function(error) {
      console.log('ERROR: ', error)
      return null
    })
}

class SearchPage extends Component {
  render() {
    return (
      <div>
        <SearchBarCustom fieldName="nameSearchField" />
        <Link to={{ pathname: './Results' }}>Search By Name</Link>
        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Symptom" fieldName="symptoms" />
        <Link to={{ pathname: './Results' }}>
          <Button
            onClick={e =>
              getGames(this.props.age, this.props.symptom, this.props.system).then(results =>
                this.props.updateResults(results)
              )
            }
          >
            Search By Filter
          </Button>
        </Link>
        <br />
        <Link to={{ pathname: './directorPage' }}>Login</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
