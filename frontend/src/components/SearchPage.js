<<<<<<< HEAD
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownButton } from './'
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
=======
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
  render() {
    return (
      <div>
        <SearchBarCustom fieldName="nameSearchField" />
        <Link to={{ pathname: './Results' }}>Search By Name</Link>
        <DropdownButton title="Console Type" fieldName="consoles" />
        <DropdownButton title="Age" fieldName="ageRange" />
        <DropdownButton title="Ailment" fieldName="ailments" />
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
>>>>>>> a180bdcbf42eeea227352a398dc72459cc935cf6
