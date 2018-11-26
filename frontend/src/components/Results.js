import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DropdownButton from './DropdownButton'
import Card from './Card'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import classnames from 'classnames'
import '../styles/results.scss'
import { saveSearch } from '../redux/modules/results'
import { bindActionCreators } from 'redux'
import Constants from '../utils/Constants.js'
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
  results: state.results.games,
  tags: [state.searchpage.ageRange, state.searchpage.symptoms],
  system: state.searchpage.consoles,
  age: state.searchpage.ageRange,
  symptom: state.searchpage.symptoms,
  gender: state.searchpage.genders
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveSearch
    },
    dispatch
  )
}

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      saveName: '',
      modal: false,
      consoles: this.determineConsoles(this.props.results)
    }
  }
  determineConsoles = results => {
    let ret = []
    Object.getOwnPropertyNames(results).map(x => (results[x].length > 0 ? ret.push(x) : null))
    return ret
  }
  saveSearch = (name, res) => {
    this.props.saveSearch(name, res)
    this.toggleModal()
  }
  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  buildCards = games =>
    games
      ? games.map(c => (
          <Link to={{ pathname: './description', state: { game: c } }}>
            <Card game={c} />
          </Link>
        ))
      : null
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
      <div className="results-background">
        <div className="resultsBox">
          <h3 className="resultsText">Results found:</h3>
          {this.props.results ? (
            <div>
              <div className="cardBox">
                <DropdownButton title="Consoles" items={this.state.consoles} />
                {
                  <Nav className="navbar" tabs fill>
                    {this.state.consoles.map((x, index) => (
                      <NavItem key={index}>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === (index + 1).toString()
                          })}
                          onClick={() => {
                            this.toggle((index + 1).toString())
                          }}
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          {x} {this.chooseImage(x)}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                }
                <TabContent activeTab={this.state.activeTab}>
                  {this.state.consoles.map((x, index) => (
                    <TabPane tabId={(index + 1).toString()}>
                      <Col>{this.buildCards(this.props.results[x])}</Col>
                    </TabPane>
                  ))}
                </TabContent>
              </div>
              <div className="saveSearch">
                <Form>
                  <FormGroup>
                    <Label for="exampleSearch">Save Search</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faSave} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="saveName"
                        id="saveName"
                        placeholder="Input Name"
                        onChange={e => {
                          this.setState({ saveName: e.target.value })
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button
                    className="resultButtons"
                    onClick={() => {
                      let resultsAndQuery = {
                        query: {
                          age: this.props.age,
                          system: this.props.consoles,
                          symptom: this.props.symptom,
                          gender: this.props.gender
                        },
                        results: this.props.results
                      }
                      this.props.saveSearch(this.state.saveName, resultsAndQuery)
                    }}
                  >
                    Save Search
                  </Button>
                  <Modal isOpen={this.state.modal}>
                    <ModalBody>Search saved successfully!</ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggleModal}>
                        Dismiss
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Form>
              </div>
              <hr />
            </div>
          ) : (
            <div>No matching results :(</div>
          )}
          <Link to={{ pathname: './' }}>
            <Button className="homeButton">
              <FontAwesomeIcon icon={faHome} /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
