import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container, Col, Row, Media } from 'reactstrap'
import { LandingPageStrings } from '../strings/english'

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
        <h3 className="homeTextL">{LandingPageStrings["greeting"]}</h3>
        <h3 className="subtitles">{LandingPageStrings["subtitle"]}</h3>
        <p className="padded">
          {LandingPageStrings["purpose"]}
        </p>
        <Link to="/search">
          <Button className="buttonpad">{LandingPageStrings["searchButton"]}</Button>
        </Link>
        <div>
          <a href="http://childsplaycharity.org/assets/downloads/booklet.pdf">
            {' '}
            {LandingPageStrings["englishPDF"]}
          </a>
          <br />
          <a href="http://childsplaycharity.org/assets/downloads/booklet.pdf">
            {' '}
            {LandingPageStrings["spanishPDF"]}
          </a>
        </div>
        <div className="line" />

        <Container id="HowToUse" className="separator" ref={this.howtoRef}>
          <h3 className="homeText2L">{LandingPageStrings["tutorialHeader"]}</h3>
          <Row className="mspace imageCentered">
            <p className="padded">
              {LandingPageStrings["tutorial1"]}
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
                {LandingPageStrings["tutorial2"]}
              </p>
              <img
                src={require('../styles/symptoms1.png')}
                alt="Anxiety/Hyperactivity, Bored (Long Term), Bored (Short Term), Cognitive Impairment, Pain, Sadness"
                height="200px"
              />
            </Col>
            <Col className="mspace">
              <p>{LandingPageStrings["tutorial3"]}</p>
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
                {LandingPageStrings["tutorial4"]}
              </p>
              <img src={require('../styles/searchimage.png')} alt="Search page" height="200px" />
            </Col>
            <Col className="mspace">
              <p>
                {LandingPageStrings["tutorial5"]}
              </p>
              <img src={require('../styles/result.png')} alt="Search page" height="110px" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                {LandingPageStrings["tutorial6"]}
              </p>
              <img src={require('../styles/inputsave.png')} alt="Search page" height="140px" />
            </Col>
            <Col>
              <p>
                {LandingPageStrings["tutorial7"]}
              </p>
              <img src={require('../styles/loadsave.png')} alt="Search page" height="110px" />
            </Col>
          </Row>
        </Container>
        <div className="line" />

        <Container className="separator">
          <h3 className="homeText2L">{LandingPageStrings["mobileGuideHeader"]}</h3>
          <Row>
            <Col>
              <h2 className="subtitles">{LandingPageStrings["android"]}</h2>
              <p>
                {LandingPageStrings["androidDesc"]}
              </p>
            </Col>
            <Col>
              <h2 className="subtitles">{LandingPageStrings["iOS"]}</h2>
              <p>
                {LandingPageStrings["iOSDesc"]}
              </p>
            </Col>
          </Row>
        </Container>
        <div className="line" />

        <Container id="Contacts" className="separator" ref={this.contactRef}>
          <Row>
            <Col>
              <h3> {LandingPageStrings["aboutHeader"]}</h3>
              <img
                className="cleared"
                src={require('../styles/cp-logo.png')}
                alt="Child's Play logo"
                height="100px"
              />
              <p>
                {LandingPageStrings["aboutDesc"]}
              </p>
              <a href="http://childsplaycharity.org"> {LandingPageStrings["learnMore"]} </a>
            </Col>
            <Col>
              <h3>{LandingPageStrings["contactHeader"]}</h3>
              <p className="address">
                <br />
                {LandingPageStrings["contactCompany"]} <br />
                {LandingPageStrings["contactAddress"]}
                <br />
                {LandingPageStrings["contactAddress2"]}
                <br />
                {LandingPageStrings["contactAddress3"]}<br />
                <br />
                {LandingPageStrings["facebook"]}{' '}
                <a href="https://www.facebook.com/ChildsPlayCharity/">{LandingPageStrings["facebookName"]}</a>
                <br />
                {LandingPageStrings["twitter"]} <a href="https://twitter.com/CPCharity/">{LandingPageStrings["twitterHandle"]}</a> <br />
                <a href="https://childsplaycharity.org/about#contact"> {LandingPageStrings["contactMore"]} </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default LandingPage
