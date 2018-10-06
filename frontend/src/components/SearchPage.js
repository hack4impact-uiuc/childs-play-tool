import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from './'
import { updateConsoleField } from '../redux/modules/searchpage'
//import '../styles/Counter.css'

const mapStateToProps = state => ({
   console: state.consoleField
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateConsoleField
    },
    dispatch
  )
}

class SearchPage extends Component {
  render() {
    return (
      <div className="SearchPage">
        <Dropdown
                  title="Console Type"
                  items={[
                    { id: '1', value: 'Wii' },
                    { id: '2', value: 'iPhone' },
                    { id: '3', value: 'XBOX' }
                  ]}
                />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
