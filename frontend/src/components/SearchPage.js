import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton } from './'
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
  render() {
    return (
      <div>
        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Ailment" fieldName="ailments" />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
