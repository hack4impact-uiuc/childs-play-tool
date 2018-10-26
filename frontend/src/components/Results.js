import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Card from './Card'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'

const mapStateToProps = state => ({
  results: state.results.games
})


class Results extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          tabGames: ["Xbox", "PS4", "Switch", "That"]
        };
      }

      
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    buildCards = (games) => games.map(c => <Card game={c} />)
    render() {
        return (
          <div>
            <Nav tabs>
            {Array.from(this.state.tabGames.map(((x,index) => 
              <NavItem key={index}> 
                <NavLink
                  className={classnames({ active: this.state.activeTab === (index + 1).toString() })}
                  onClick={() => { this.toggle((index + 1).toString()); }}
                >
                  {x}
                </NavLink>
              </NavItem>
            )))}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {Array.from(this.state.tabGames.map(((x,index) =>
              <TabPane tabId= {(index+1).toString()} >
                <Row>
                  <Col sm="12">
                    <h4>Tab {(index+1).toString()} Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              )))}
            </TabContent>
            {this.buildCards(this.props.results)}
            <br />
            <Link to={{ pathname: './' }}>Go to home</Link>
          </div>
        );
      }
=======
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
        <Link to={{ pathname: './' }}>Go to home</Link>
      </div>
    )
  }
>>>>>>> a180bdcbf42eeea227352a398dc72459cc935cf6
}

export default connect(mapStateToProps)(Results)