import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Constants } from './'
import { updateField } from '../redux/modules/searchpage'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const mapStateToProps = state => ({
  consoleField: state.consoleField
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
    this.props.updateField(this.props.fieldName, this.state.selectedVal)
  }

  dropdownItems = Constants.consoles

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
                  console.log(item.value)
                  this.setState({ selectedVal: item.value })
                  this.props.updateField(this.props.fieldName, this.state.selectedVal)
                }}
              >
                {item.value}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <h>Current value: {this.state.selectedVal}</h>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownButton)
