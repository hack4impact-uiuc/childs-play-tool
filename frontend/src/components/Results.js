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
            this.props.saveSearch(this.state.saveName, this.props.results)
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
