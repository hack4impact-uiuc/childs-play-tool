import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constants from '../utils/Constants'
import { updateField } from '../redux/modules/searchpage'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../styles/styles.scss'

const mapStateToProps = state => ({
  savedSearches: state.results.searches,
  results: state.results.games
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField
    },
    dispatch
  )
}

class DropdownButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVal: this.props.title,
      title: this.props.title,
      dropdownOpen: false
    }

    this.props.updateField(this.props.fieldName, this.state.selectedVal)
  }

  determineDropdownItems = fieldName => {
    if (fieldName === 'selectedSaveSearch') {
      return this.props.savedSearches
    }
    else if (fieldName == 'consoleNames') {
      return Object.keys(this.props.results)
    } 
    else {
      return Constants[fieldName]
    }
  }

  dropdownItems = this.determineDropdownItems(this.props.fieldName)

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render() {
    return (
      <div>
        <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle color="success" caret>
            {this.state.selectedVal}
          </DropdownToggle>
          <DropdownMenu right>
            {this.dropdownItems.length > 0
              ? this.dropdownItems.map(item => (
                  <DropdownItem
                    onClick={e => {
                      this.setState({ selectedVal: item.value })
                      this.props.updateField(this.props.fieldName, item.value)
                    }}
                  >
                    {item.value}
                  </DropdownItem>
                ))
              : null}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownButton)
