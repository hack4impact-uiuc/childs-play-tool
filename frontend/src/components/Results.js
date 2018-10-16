import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Card from './Card'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const mapStateToProps = state => ({
  results: state.results.games
})


class Results extends Component {
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
}

export default connect(mapStateToProps)(Results)