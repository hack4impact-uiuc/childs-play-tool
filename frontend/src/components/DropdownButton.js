import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constants from '../utils/Constants'
import { updateField } from '../redux/modules/searchpage'
import { updateConsole, deleteSearch } from '../redux/modules/results'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import '../styles/styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
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
  activeTab: state.results.activeTab,
  selectedSaveSearch: state.searchpage.selectedSaveSearch
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField,
      updateConsole,
      deleteSearch
    },
    dispatch
  )
}

class DropdownButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      consoleSelectedVal: this.props.items ? (
        <div style={{ display: 'inline-block' }}>
          {this.props.currentConsole} {this.chooseImage(this.props.currentConsole)}
        </div>
      ) : (
        ''
      ),
      selectedVal: this.props.title,
      dropdownOpen: false,
      deleteField: null,
      modalOpen: false
    }

    this.props.updateField(this.props.fieldName, this.state.selectedVal)
  }

  determineDropdownItems = fieldName => {
    if (fieldName === 'selectedSaveSearch') {
      return this.props.savedSearches
    } else if (fieldName === 'consoleNames') {
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
    this.dropdownItems = this.props.fieldName
      ? this.determineDropdownItems(this.props.fieldName)
      : null
  }

  chooseImage = system => {
    if (system === Constants.consoles[0].value) return <FontAwesomeIcon icon={faAndroid} />
    else if (system === Constants.consoles[1].value) return <FontAwesomeIcon icon={faApple} />
    else if (system === Constants.consoles[2].value)
      return <img alt="" src={require('../styles/htc.png')} />
    else if (system === Constants.consoles[3].value)
      return <img alt="" src={require('../styles/3ds.png')} />
    else if (system === Constants.consoles[4].value)
      return <FontAwesomeIcon icon={faNintendoSwitch} />
    else if (system === Constants.consoles[5].value) return <FontAwesomeIcon icon={faVrCardboard} />
    else if (system === Constants.consoles[6].value) return <FontAwesomeIcon icon={faPlaystation} />
    else if (system === Constants.consoles[7].value) return <FontAwesomeIcon icon={faGamepad} />
    else if (system === Constants.consoles[8].value)
      return <img alt="" src={require('../styles/psvr.png')} />
    else if (system === Constants.consoles[9].value) return <FontAwesomeIcon icon={faXbox} />
    else return
  }

  render() {
    return (
      <div>
        <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle color="success" caret>
            {this.state.consoleSelectedVal ? this.state.consoleSelectedVal : this.state.selectedVal}
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.fieldName === 'selectedSaveSearch'
              ? this.dropdownItems.map(item => (
                  <DropdownItem
                    onClick={e => {
                      this.setState({ selectedVal: item.value })
                      this.props.updateField(this.props.fieldName, item.value)
                    }}
                  >
                    {item.value}

                    <Button
                      close
                      color="link"
                      onClick={() =>
                        this.setState({ modalOpen: !this.state.modalOpen, deleteField: item.value })
                      }
                    />
                  </DropdownItem>
                ))
              : this.props.items
                ? this.props.items.map((item, index) => (
                    <DropdownItem
                      onClick={e => {
                        this.setState({
                          consoleSelectedVal: (
                            <div style={{ display: 'inline-block' }}>
                              {item} {this.chooseImage(item)}
                            </div>
                          )
                        })
                        this.props.updateTabConsole((index + 1).toString())
                        this.props.updateConsole(item)
                      }}
                    >
                      <div style={{ display: 'inline-block' }}>
                        {item} {this.chooseImage(item)}
                      </div>
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
        <Modal isOpen={this.state.modalOpen}>
          <ModalBody>{DropdownButtonStrings['savedSearchQuestion']}</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                e.stopPropagation()
                this.props.deleteSearch(this.state.deleteField)
                this.setState({
                  selectedVal: 'Saved Searches',
                  modalOpen: !this.state.modalOpen
                })
              }}
            >
              {DropdownButtonStrings['yes']}
            </Button>
            <Button
              color="primary"
              onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}
            >
              {DropdownButtonStrings['no']}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownButton)
