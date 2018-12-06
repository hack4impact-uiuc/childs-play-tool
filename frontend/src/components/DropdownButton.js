import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constants from '../utils/Constants'
import { updateField } from '../redux/modules/searchpage'
import { updateConsole } from '../redux/modules/results'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../styles/styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faVrCardboard, faSave, faHome } from '@fortawesome/free-solid-svg-icons'
import { DropdownButtonStrings } from '../strings/english'
import {
  faNintendoSwitch,
  faXbox,
  faPlaystation,
  faApple,
  faAndroid
} from '@fortawesome/free-brands-svg-icons'

const mapStateToProps = state => ({
  savedSearches: state.results.searches,
  results: state.results.games,
  currentConsole: state.results.currentConsole,
  activeTab: state.results.activeTab
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField,
      updateConsole
    },
    dispatch
  )
}

class DropdownButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      consoleSelectedVal: this.props.items
        ? this.props.items[parseInt(this.props.activeTab) - 1]
        : '',
      selectedVal: this.props.title,
      dropdownOpen: false
    }

    this.props.updateField(this.props.fieldName, this.state.selectedVal)
  }

  determineDropdownItems = fieldName => {
    if (fieldName === 'selectedSaveSearch') {
      return this.props.savedSearches
    } else if (fieldName == 'consoleNames') {
      return Object.keys(this.props.results)
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
            {this.state.consoleSelectedVal
              ? this.state.consoleSelectedVal
              : this.props.items
                ? this.props.items[parseInt(this.props.activeTab) - 1]
                : this.state.selectedVal}
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.items
              ? this.props.items.map((item, index) => (
                  <DropdownItem
                    onClick={e => {
                      this.setState({
                        consoleSelectedVal: (
                          <html>
                            {item} {this.chooseImage(item)}
                          </html>
                        )
                      })
                      this.props.updateTabConsole((index + 1).toString())
                      this.props.updateConsole(item)
                    }}
                  >
                    {item} {this.chooseImage(item)}
                  </DropdownItem>
                ))
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
            {(this.props.title === DropdownButtonStrings['console'] ||
              this.props.title === DropdownButtonStrings['gender']) && (
              <>
                <DropdownItem divider />
                <DropdownItem
                  onClick={e => {
                    this.setState({ selectedVal: this.props.title })
                    this.props.updateField(this.props.fieldName, this.props.title)
                  }}
                >
                  {DropdownButtonStrings['none']}
                </DropdownItem>
              </>
            )}
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
