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
  CardTitle,
  CardText,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import classnames from 'classnames'
import { Button } from 'reactstrap'
import '../styles/styles.scss'
import { saveSearch } from '../redux/modules/results'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
  results: state.results.games
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
  buildCards = games =>
    games
      ? games.map(c => (
          <Link to={{ pathname: './description', state: { game: c } }}>
            <Card className="cardBorder" game={c} />
          </Link>
        ))
      : null
  chooseImage = system => {
    if (system === 'PlayStation Vita') return <img src={require('../styles/psvita.png')} />
    else if (system === 'Xbox One') return <img src={require('../styles/xbox1.png')} />
    else if (system === 'PlayStation 4') return <img src={require('../styles/ps4.png')} />
    else if (system === 'Nintendo Switch') return <img src={require('../styles/switch.png')} />
    else if (system === 'Nintendo 3DS') return <img src={require('../styles/3ds.png')} />
    else if (system === 'Apple iOS') return <img src={require('../styles/apple.png')} />
    else if (system === 'Android') return <img src={require('../styles/android.png')} />
    else if (system === 'PlayStation VR') return <img src={require('../styles/psvr.png')} />
    else if (system === 'HTC VIVE') return <img src={require('../styles/htc.png')} />
    else if (system === 'Oculus Rift') return <img src={require('../styles/oculus.png')} />
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
                    <Col sm="12">{this.buildCards(this.props.results[x])}</Col>
                  </Row>
                </TabPane>
              ))}
            </TabContent>
          </div>
        ) : (
          <div>No matching results :(</div>
        )}
        <br />
        <Link to={{ pathname: './' }}>
          <Button className="homeButton">Go to Home</Button>
        </Link>
        <Form>
          <FormGroup>
            <Label for="exampleSearch">Search by Name</Label>
            <Input
              type="text"
              name="saveName"
              id="saveName"
              placeholder="Input name for saved search "
              onChange={e => {
                this.setState({ saveName: e.target.value })
              }}
            />
          </FormGroup>
        </Form>
        <Button
          color="primary"
          onClick={() => {
            this.props.saveSearch(this.state.saveName, JSON.stringify(this.props.results))
          }}
        >
          Save Search
        </Button>
        <Link to={{ pathname: './' }}>Go to home</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
