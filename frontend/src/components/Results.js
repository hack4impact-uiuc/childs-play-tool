import React, { Component } from 'react'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
  age: state.results.query.age,
  symptom: state.results.query.symptom,
  gender: state.results.query.gender,
  search: state.results.query.search
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
      modal: false
    }
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
  buildCards = (games, tags) =>
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
          <div align="center">
            {this.props.age && this.props.age != 'Age*' ? (
              <Tag type={'age'} tag={this.props.age} />
            ) : null}
            {this.props.symptom && this.props.symptom != 'Symptom*' ? (
              <Tag type={'symptom'} tag={this.props.symptom} />
            ) : null}
            {this.props.gender &&
            this.props.gender != 'No Discernable Gender' &&
            this.props.gender != 'Character Gender' ? (
              <Tag type={'gender'} tag={this.props.gender} />
            ) : null}
            {this.props.search && this.props.search != '' ? (
              <h4> You searched for: {this.props.search} </h4>
            ) : null}
          </div>
          {this.props.results ? (
            <div>
              <div className="cardBox">
                <Nav className="navbar" tabs fill>
                  {Object.getOwnPropertyNames(this.props.results).map((x, index) => (
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
                <TabContent activeTab={this.state.activeTab}>
                  {Object.getOwnPropertyNames(this.props.results).map((x, index) => (
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
