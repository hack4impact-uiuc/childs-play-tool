import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Constants } from './'
import { updateField } from '../redux/modules/searchpage'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const mapStateToProps = state => ({
  consoleField: state.consoleField,
  ageField: state.ageField,
  ailmentField: state.ailmentField
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
    this.toggle = this.toggle.bind(this)
    this.determineDropdownItems = this.determineDropdownItems.bind(this)
    this.props.updateField(this.props.fieldName, this.state.selectedVal)
  }

  determineDropdownItems(fieldName) {
          switch (fieldName) {
                  case "consoleField": return Constants.consoles
                  case "ailmentField": return Constants.ailments
                  case "ageField": return Constants.ages
                  default: return Constants.consoles
          }
  }

  dropdownItems = this.determineDropdownItems(this.props.fieldName)

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{this.state.selectedVal}</DropdownToggle>
          <DropdownMenu right>
            {this.dropdownItems.map(item => (
              <DropdownItem
                onClick={e => {
                  this.setState({ selectedVal: item.value })
                  this.props.updateField(this.props.fieldName, item.value)
                }}
              >
                {item.value}
              </DropdownItem>
            ))}
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
