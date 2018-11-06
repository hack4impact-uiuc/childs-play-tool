import React, { Component } from 'react'
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
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
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
  tags: [state.searchpage.ageRange, state.searchpage.symptoms]
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
      saveName: ''
    }
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
          <Link to={{ pathname: './description', state: { game: c, tags: tags } }}>
            <Card className="cardBorder" game={c} tags={tags} />
          </Link>
        ))
      : null
  chooseImage = system => {
    if (system === Constants.consoles[0].value) return <FontAwesomeIcon icon={faGamepad} />
    else if (system === Constants.consoles[1].value) return <FontAwesomeIcon icon={faXbox} />
    else if (system === Constants.consoles[2].value) return <FontAwesomeIcon icon={faPlaystation} />
    else if (system === Constants.consoles[3].value)
      return <FontAwesomeIcon icon={faNintendoSwitch} />
    else if (system === Constants.consoles[4].value)
      return <img src={require('../styles/3ds.png')} />
    else if (system === Constants.consoles[5].value) return <FontAwesomeIcon icon={faApple} />
    else if (system === Constants.consoles[6].value) return <FontAwesomeIcon icon={faAndroid} />
    else if (system === Constants.consoles[7].value)
      return <img src={require('../styles/psvr.png')} />
    else if (system === Constants.consoles[8].value)
      return <img src={require('../styles/htc.png')} />
    else if (system === Constants.consoles[9].value) return <FontAwesomeIcon icon={faVrCardboard} />
    else return
  }
  render() {
    return (
      <div>
        {this.props.results ? (
          <div>
            <Nav tabs>
              {Object.getOwnPropertyNames(this.props.results).map((x, index) => (
                <NavItem key={index}>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === (index + 1).toString()
                    })}
                    onClick={() => {
                      this.toggle((index + 1).toString())
                    }}
                  >
                    {x} {this.chooseImage(x)}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {Object.getOwnPropertyNames(this.props.results).map((x, index) => (
                <TabPane tabId={(index + 1).toString()}>
                  <Row>
                    <Col sm="12">{this.buildCards(this.props.results[x], this.props.tags)}</Col>
                  </Row>
                </TabPane>
              ))}
            </TabContent>
            <Form>
              <FormGroup>
                <div className="saveSearch">
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
                </div>
              </FormGroup>
              <Button
                className="resultButtons"
                onClick={() => {
                  this.props.saveSearch(this.state.saveName, this.props.results)
                }}
              >
                Save Search
              </Button>
            </Form>
          </div>
        ) : (
          <div>No matching results :(</div>
        )}
        <br />
        <Link to={{ pathname: './' }}>
          <Button className="resultButtons">
            <FontAwesomeIcon icon={faHome} /> Go Home
          </Button>
        </Link>
        
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
