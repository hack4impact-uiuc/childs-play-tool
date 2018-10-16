import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton, SearchBarCustom } from './'
import { updateField } from '../redux/modules/searchpage'
import { Link } from 'react-router-dom'

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

        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Ailment" fieldName="ailments" />
        <Link to={{ pathname: './directorPage' }}>Login</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
