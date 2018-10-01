// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStuff } from './../actions'
import StuffList from './StuffList.component'
import type { StuffStateProps } from './../types'

function mapStateToProps(state): StuffStateProps {
  return {
    stuff: state.stuff
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStuff }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StuffList)
