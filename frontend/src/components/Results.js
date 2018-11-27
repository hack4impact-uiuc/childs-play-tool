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
import { runInThisContext } from 'vm';

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
    }
    this.updateTab = this.updateTab
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
  updateTab = tab => {
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

  render() {
    return (
      <div className="results-background">
        <div className="resultsBox">
          <h3 className="resultsText">  Results found:</h3>
          {this.props.results ? (
            <div>
              <div className="cardBox">
                <div align="right">
                <DropdownButton title={this.determineConsoles(this.props.results)[0]} items={this.determineConsoles(this.props.results)} updateTabConsole={this.updateTab}/>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                  {this.determineConsoles(this.props.results).map((x, index) => (
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
