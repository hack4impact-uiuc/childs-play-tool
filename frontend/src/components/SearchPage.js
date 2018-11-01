import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { updateResults } from '../redux/modules/results'
import { Button } from 'reactstrap'
import { getGames } from '../utils/ApiWrapper'
import '../styles/styles.scss'

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
class SearchPage extends Component {
  render() {
    return (
      <div>
        <body className="background">
          {/* <div className="background"></div> */}
          <h3 className="homeText">
            Hello! Welcome to the Child's Play Game Finder. You can search a game by name or filter
            by inputs.
          </h3>
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
          <br />
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
