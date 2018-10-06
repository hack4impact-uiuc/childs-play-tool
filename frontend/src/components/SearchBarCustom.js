import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { increment, reset, set } from '../redux/modules/counter'
import '../styles/SearchBar.css'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {}

class SearchBarCustom extends Component<Props, State> {
  constructor(props) {
    super(props)
  }
  state = {
    isClearable: false,
    isSearchable: true,
    selectedOption: null
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption })
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            ref="filterTextInput"
            onChange={this.handleChange}
          />
          <p />
        </form>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarCustom)
