import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
//import { increment, reset, set } from '../redux/modules/counter'
//import '../styles/Counter.css'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {}

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVal: '',
      title : ''
    }
  }

  dropdownItems = this.props.items
  render() {
    //const { count } = this.props.counter.count
    return (
            <span className="space">
            <DropdownButton

              title={this.props.title }
              id="dropdown-menu"> 

              {this.dropdownItems.map(item => (
                <MenuItem
                  key={item.id}
                  onSelect={() => {
                    this.setState({ selectedVal: item.value})
                  }}>
                  {item.value}
                </MenuItem>
                ))}
            </DropdownButton>
            </span>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown)
