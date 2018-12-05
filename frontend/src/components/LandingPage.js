import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container, Col, Row, Media } from 'reactstrap'

import '../styles/landingpage.scss'

class LandingPage extends Component {
  constructor(props) {
    super(props)

    // this.contactRef = React.createRef()
    // this.howtoRef = React.createRef()
  }

  componentDidMount() {
    // if (this.props.location.hash === '#Contacts') {
    //   window.scrollTo({
    //     top: this.contactRef.current.offsetTop,
    //     behavior: "auto"
    //   })
    // } else if (this.props.location.hash === '#HowToUse') {
    //   window.scrollTo({
    //     top: this.howtoRef.current.offsetTop,
    //     behavior: "auto"
    //   })
    // }
    if (this.props.location.hash) {
      document.querySelector(this.props.location.hash).scrollIntoView()
    }
  }

  render() {
    return (
      <div className="backgroundL">
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <h3 className="homeTextL">Welcome!</h3>
        <h3 className="subtitles">Therapeutic Video Game Guide</h3>
        <p className="padded">
          This guide was designed as a quick reference to help caretakers quickly select games for
          their patients. Caretakers can reference the category that best fits the symptoms of the
          patient and select one of the games listed. The games recommended in this guide were
          curated by researchers at EEDAR, a market-leading video game research firm.
        </p>
        <Link to="/search">
          <Button className="buttonpad">Search Games</Button>
        </Link>
        <div>
          <a href="http://childsplaycharity.org/assets/downloads/booklet.pdf">
            {' '}
            Click here for English pdf Guide
          </a>
          <br />
          <a href="http://childsplaycharity.org/assets/downloads/booklet.pdf">
            {' '}
            Click here for Spanish pdf Guide
          </a>
        </div>
        <div className="line" />

        <Container id="HowToUse" className="separator" ref={this.howtoRef}>
          <h3 className="homeText2L">How to Use</h3>
          <Row className="mspace imageCentered">
            <p className="padded">
              Searching for game recommendations by name will return all games that contain the
              given name. Type the name into the following input field:
            </p>
            <img
              src={require('../styles/searchbyname.png')}
              alt="Search by name field"
              height="60px"
            />
          </Row>
          <Row>
            <Col className="mspace">
              <p>
                To search for game recommendations, you must select one of the six symptom
                categories:
              </p>
              <img
                src={require('../styles/symptoms1.png')}
                alt="Anxiety/Hyperactivity, Bored (Long Term), Bored (Short Term), Cognitive Impairment, Pain, Sadness"
                height="200px"
              />
            </Col>
            <Col className="mspace">
              <p>You must also select one of the age groups:</p>
              <img
                src={require('../styles/agecategories.png')}
                alt="12 and under, 13 and older"
                height="200px"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mspace">
              <p>
                It is optional to select a game console and the gender of the main character. The
                search will return all games that match the specifications.
              </p>
              <img src={require('../styles/searchimage.png')} alt="Search page" height="200px" />
            </Col>
            <Col className="mspace">
              <p>
                Each game has labels that describe its intended age group, applicable symptoms, and
                gender of the main character.
              </p>
              <img src={require('../styles/result.png')} alt="Search page" height="110px" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                After performing a search, there is the option to save its results at the bottom of
                the results page. Be sure to provide a descriptive name that will help you identify
                it for later viewing.
              </p>
              <img src={require('../styles/inputsave.png')} alt="Search page" height="140px" />
            </Col>
            <Col>
              <p>
                Load a saved search at the bottom of the search page to view the previously saved
                game recommendations.
              </p>
              <img src={require('../styles/loadsave.png')} alt="Search page" height="110px" />
            </Col>
          </Row>
        </Container>
        <div className="line" />

        <Container className="separator">
          <h3 className="homeText2L">Saving this Guide as a Mobile App</h3>
          <Row>
            <Col>
              <h2 className="subtitles">Android</h2>
              <p>
                Tap on the vertical ellipsis (three dots) button on the right to reveal more
                options. Select "Add to Home Screen." A pop up will appear, tap on "Add" to proceed.
                Confirm the website&#39;s addition to your home screen, and it will show you a
                preview of its shortcut icon. You can select the location now or move it later.
              </p>
            </Col>
            <Col>
              <h2 className="subtitles">iOS</h2>
              <p>
                Select the URL at the top to highlight it. At the bottom of the screen, tap the
                share icon. Tap the icon labeled "Add to Home Screen." Tap Add in the upper-right
                corner.
              </p>
            </Col>
          </Row>
        </Container>
        <div className="line" />

        <Container id="Contacts" className="separator" ref={this.contactRef}>
          <Row>
            <Col>
              <h3> About Child&#39;s Play</h3>
              <img
                className="cleared"
                src={require('../styles/cp-logo.png')}
                alt="Child's Play logo"
                height="100px"
              />
              <p>
                Child&#39;s Play is a game industry charity dedicated to improving the lives of
                children with toys and games in a network of over 150 hospitals worldwide.
              </p>
              <a href="http://childsplaycharity.org"> Learn More </a>
            </Col>
            <Col>
              <h3>Contact Information</h3>
              <p className="address">
                <br />
                Child’s Play <br />
                8151 164th Ave NE
                <br />
                PMB #418
                <br />
                Redmond, WA 98052 <br />
                <br />
                Facebook:{' '}
                <a href="https://www.facebook.com/ChildsPlayCharity/">ChildsPlayCharity</a>
                <br />
                Twitter: <a href="https://twitter.com/CPCharity/">@CPCharity</a> <br />
                <a href="https://childsplaycharity.org/about#contact"> More Contact Information </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default LandingPage
