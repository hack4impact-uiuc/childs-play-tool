import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton } from './'
//import { DropdownButton, MenuItem } from 'react-bootstrap'
import { updateField } from '../redux/modules/searchpage'
//import '../styles/Counter.css'

const mapStateToProps = state => ({
  //console: state.consoleField
})

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
        <DropdownButton title="Console Type" fieldName="consoleField" />
        <DropdownButton title="Age" fieldName="ageField" />
        <DropdownButton title="Ailment" fieldName="ailmentField" />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
