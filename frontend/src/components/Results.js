import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Card from './Card'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import { Button } from 'reactstrap'

const mapStateToProps = state => ({
  results: state.results.games
})

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
          </div>
        ) : (
          <div>No matching results :(</div>
        )}
        <br />
        <Link to={{ pathname: './' }}>
          <Button className="homeButton">Go to Home</Button>
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Results)
