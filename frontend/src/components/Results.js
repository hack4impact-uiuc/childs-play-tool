import React, { Component } from 'react'
import Tag from './Tag'
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
import { saveSearch, updateConsole, updateTab } from '../redux/modules/results'
import { bindActionCreators } from 'redux'
import Constants from '../utils/Constants.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGamepad,
  faVrCardboard,
  faSave,
  faHome,
  faClipboard,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons'
import {
  faNintendoSwitch,
  faXbox,
  faPlaystation,
  faApple,
  faAndroid
} from '@fortawesome/free-brands-svg-icons'
import { runInThisContext } from 'vm'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ResultsStrings } from '../strings/english'

const mapStateToProps = state => ({
  results: state.results.games,
  tags: [state.searchpage.ageRange, state.searchpage.symptoms],
  system: state.searchpage.consoles,
  age: state.results.query.age,
  symptom: state.results.query.symptom,
  gender: state.results.query.gender,
  search: state.results.query.search,
  activeTab: state.results.activeTab,
  allGames: state.results.allGames,
  loading: state.results.loading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveSearch,
      updateTab,
      updateConsole
    },
    dispatch
  )
}

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: this.props.activeTab,
      saveName: '',
      modal: false,
      copied: false
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
    if (this.props.activeTab !== tab) {
      this.props.updateTab({ activeTab: tab })
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
  resultsURL = (name, age, symptom, gender, system) => {
    let url = window.location.protocol + '//' + window.location.hostname
    if (url === 'http://localhost') url += ':3000'
    url += '/resultsLink?'
    if (name && name !== '') return url + 'name=' + name
    else {
      url = url + 'age=' + age + '&symptom=' + symptom
      if (gender && gender !== ResultsStrings["noGender"] && gender !== ResultsStrings["gender"])
        url = url + '&gender=' + gender
      if (system && system !== '' && system !== ResultsStrings["console"]) url = url + '&system=' + system
      return url
    }
  }
  toggleClipboard = () => {
    this.setState({ copied: true })
  }
  render() {
    if (this.props.loading) {
      return <div>{ResultsStrings["loading"]}</div>
    }
    return (
      <div className="results-background">
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <div className="resultsBox">
          {this.props.allGames ? (
            <h3 className="resultsText">{ResultsStrings["resultsAll"]}</h3>
          ) : (
            <h3 className="resultsText">{ResultsStrings["resultsFound"]}</h3>
          )}
          <div align="center">
            {this.props.age && this.props.age != ResultsStrings["age"] ? (
              <Tag type={'age'} tag={this.props.age} />
            ) : null}
            {this.props.symptom && this.props.symptom != ResultsStrings["symptom"] ? (
              <Tag type={'symptom'} tag={this.props.symptom} />
            ) : null}
            {this.props.gender &&
            this.props.gender != ResultsStrings["noGender"] &&
            this.props.gender != ResultsStrings["gender"] ? (
              <Tag type={'gender'} tag={this.props.gender} />
            ) : null}
            {this.props.search && this.props.search != '' ? (
              <h4> {ResultsStrings["resultsSearched"]} {this.props.search} </h4>
            ) : null}
          </div>
          {this.props.results ? (
            <div>
              <div>
                <div style={{ float: 'right' }}>
                  <DropdownButton
                    title={
                      this.determineConsoles(this.props.results)[parseInt(this.props.activeTab) - 1]
                    }
                    items={this.determineConsoles(this.props.results)}
                    updateTabConsole={this.updateTab}
                  />
                </div>
                <div style={{ float: 'left' }}>
                  {this.props.allGames ? null : (
                    <Link to={{ pathname: './search' }}>
                      <Button className="homeButton">
                        <FontAwesomeIcon icon={faHome} /> {ResultsStrings["searchAgain"]}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <br />
              <br />
              <hr style={{ clear: 'both' }} />
              <div>
                <TabContent activeTab={this.props.activeTab}>
                  {this.determineConsoles(this.props.results).map((x, index) => (
                    <TabPane tabId={(index + 1).toString()}>
                      <Col>{this.buildCards(this.props.results[x])}</Col>
                    </TabPane>
                  ))}
                </TabContent>
              </div>
              {this.props.allGames ? null : (
                <div className="saveSearch">
                  <Form>
                    <FormGroup>
                      <Label for="exampleSearch">{ResultsStrings["saveLabel"]}</Label>
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
                          placeholder={ResultsStrings["placeholder"]}
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
                        this.toggleModal()
                      }}
                    >
                      {ResultsStrings["saveButton"]}
                    </Button>
                    <br />
                    <br />
                    <CopyToClipboard
                      text={this.resultsURL(
                        this.props.search,
                        this.props.age,
                        this.props.symptom,
                        this.props.gender,
                        this.props.system
                      )}
                    >
                      <Button className="resultButtons" onClick={this.toggleClipboard}>
                        {this.state.copied ? (
                          <FontAwesomeIcon icon={faClipboardCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faClipboard} />
                        )}{' '}
                        {ResultsStrings["copyButton"]}
                      </Button>
                    </CopyToClipboard>
                    <Modal isOpen={this.state.modal}>
                      <ModalBody>{ResultsStrings["saved"]}</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>
                          {ResultsStrings["dismiss"]}
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Form>
                </div>
              )}
              <hr />
            </div>
          ) : (
            <div>{ResultsStrings["noResults"]}</div>
          )}
          {this.props.allGames ? null : (
            <Link to={{ pathname: './search' }}>
              <Button className="homeButton">
                <FontAwesomeIcon icon={faHome} /> {ResultsStrings["searchAgain2"]}
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
