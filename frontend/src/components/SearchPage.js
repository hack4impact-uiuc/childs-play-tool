import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { loadState }  from '../redux/localStorage'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField
    },
    dispatch
  )
}

class SearchPage extends Component {
  render() {
    return (
      <div>
        <SearchBarCustom fieldName="nameSearchField" />
        <Link to={{ pathname: './Results' }}>Search</Link>
        <br />
        <br />
        <h> Search By Filters </h>
        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Symptom" fieldName="symptoms" />
        <Link to={{ pathname: './Results' }}>Search</Link>
        <br />
        <br />
        <h> Load Previous Search </h>
        <DropdownButton title="Saved Searches" fieldName="savedSearches" />
        <br />
        <br />
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
