// @flow
import { connect } from 'react-redux'
import Colors from './Colors.component'
import type { ColorsProps } from './../types'

function mapStateToProps(state): ColorsProps {
  return {
    colors: state.colors
  }
}

export default connect(mapStateToProps)(Colors)
