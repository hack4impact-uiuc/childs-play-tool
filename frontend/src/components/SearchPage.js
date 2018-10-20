import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'

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
  constructor(props) {
    super(props)
    this.state = { test: 'test' }
  }

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem('searchResults', JSON.stringify(nextState.test))
  }

  render() {
    return (
      <div>
        <SearchBarCustom fieldName="nameSearchField" />
        <Link to={{ pathname: './Results' }}>Search By Name</Link>
        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Symptom" fieldName="symptoms" />
        <Link to={{ pathname: './Results' }}>Search By Filters</Link>
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
