import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
//import { updateResults } from '../redux/modules/results'
import Card from './Card'
//import axios from 'axios'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'

const mapStateToProps = state => ({
  results: state.results.games
})

/* const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateResults
    },
    dispatch
  )
} */
/*function getGames(age, symptom, system){
  return axios
    .get(
      'localhost::8080/games' +
      '?age=' +
      age +
      '&symptom=' +
      symptom +
      '&system=' +
      system
    )
    .then(response => {
      return response.data.result.games
    })
    .catch(function(error) {
      console.log('ERROR: ', error)
      return null
    })
}*/
class Results extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1'
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  buildCards = games => (games ? games.map(c => <Card game={c} />) : null)
  render() {
    console.log(this.props.results)
    console.log(Object.values(this.props.results))
    console.log(this.props.results[0])
    console.log(this.props.results['Nintendo Switch'])
    console.log(this.props.results.games)
    return (
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
                {x}
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
        <br />
        <Link to={{ pathname: './' }}>Go to home</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps /*, mapDispatchToProps*/)(Results)
