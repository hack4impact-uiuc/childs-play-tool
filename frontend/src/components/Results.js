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
      </div>
    )
  }
}

export default connect(mapStateToProps)(Results)
