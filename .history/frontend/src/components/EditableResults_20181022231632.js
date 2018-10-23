import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import EditableCard from './EditableCard'
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
  Col
} from 'reactstrap'
import classnames from 'classnames'

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
  buildEditableCards = games => games.map(c => <Card game={c} />)
  render() {
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
                <Col sm="12">{this.buildEditableCards(this.props.results[x])}</Col>
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

export default connect(mapStateToProps)(Results)
