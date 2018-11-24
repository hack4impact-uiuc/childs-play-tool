import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constants from '../utils/Constants'
import { updateField } from '../redux/modules/searchpage'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../styles/styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faVrCardboard, faSave, faHome } from '@fortawesome/free-solid-svg-icons'
import {
  faNintendoSwitch,
  faXbox,
  faPlaystation,
  faApple,
  faAndroid
} from '@fortawesome/free-brands-svg-icons'

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
    } else {
      return Constants[fieldName]
    }
  }

  dropdownItems = this.props.fieldName ? this.determineDropdownItems(this.props.fieldName) : null

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  chooseImage = system => {
    if (system === Constants.consoles[0].value) return <FontAwesomeIcon icon={faAndroid} />
    else if (system === Constants.consoles[1].value) return <FontAwesomeIcon icon={faApple} />
    else if (system === Constants.consoles[2].value)
      return <img src={require('../styles/htc.png')} />
    else if (system === Constants.consoles[3].value)
      return <img src={require('../styles/3ds.png')} />
    else if (system === Constants.consoles[4].value)
      return <FontAwesomeIcon icon={faNintendoSwitch} />
    else if (system === Constants.consoles[5].value) return <FontAwesomeIcon icon={faVrCardboard} />
    else if (system === Constants.consoles[6].value) return <FontAwesomeIcon icon={faPlaystation} />
    else if (system === Constants.consoles[7].value) return <FontAwesomeIcon icon={faGamepad} />
    else if (system === Constants.consoles[8].value)
      return <img src={require('../styles/psvr.png')} />
    else if (system === Constants.consoles[9].value) return <FontAwesomeIcon icon={faXbox} />
    else return
  }

  render() {
    return (
      <div>
        <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle color="success" caret>
            {this.state.selectedVal}
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.items
              ? this.props.items.map(
                  item =>
                    this.props.results[item].length > 0 ? (
                      <DropdownItem
                        onClick={e => {
                          this.setState({
                            selectedVal: (
                              <inline-div>
                                {item} {this.chooseImage(item)}
                              </inline-div>
                            )
                          })
                        }}
                      >
                        {item} {this.chooseImage(item)}
                      </DropdownItem>
                    ) : null
                )
              : this.dropdownItems.length > 0
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
