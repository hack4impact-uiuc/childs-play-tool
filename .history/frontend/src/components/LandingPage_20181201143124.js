import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container, Col, Row, Media } from 'reactstrap'

import '../styles/landingpage.scss'

class LandingPage extends Component {
  render() {
    return (
      <div className="backgroundL">
        <link
          href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro"
          rel="stylesheet"
        />
        <ul>
            <li><a href="http://childsplaycharity.org" className="cp" >Child's Play</a></li>
            <li><a href="/admin" className="rest">Admin</a></li>
            <li><a href="#Contact" className="rest">Contacts</a></li>
            <li><a href="#HowToUse" className="rest">How to Use</a></li>
            <li><a href="/search" className="rest">Search</a></li>
        </ul>

        <div className="part1">
            <h3 className="homeTextL">
            Child&#39;s Play Therapeutic Video Game Guide
            </h3>
            <p>
            The purpose of this guide is to recommend therapeutic video games for children based on their symptoms. 
            The games recommended in this guide were curated by researchers at EEDAR, a market-leading video game research firm.
            </p>
            <Button href="/search">
                Search Games
            </Button>
            <div>
                <a href="http://childsplaycharity.org/assets/downloads/booklet.pdf"> Click here for English pdf Guide</a> 
                <br></br>
                <a href="http://childsplaycharity.org/assets/downloads/booklet.pdf"> Click here for Spanish pdf Guide</a>
            </div>
        </div>
        <div className="line"></div>

        <Container id="HowToUse" className="separator">
        <h3 className="homeText2L">
            How to Use
        </h3>
            <Row>
                <Col>
                    <p>
                        Game recommendations have been categorized into six symptom categories:
                    </p>
                    <img src={require("../styles/symptoms1.png")} alt="Anxiety/Hyperactivity, Bored (Long Term), Bored (Short Term), Cognitive Impairment, Pain, Sadness" height="200px"></img>
                </Col>
                <Col>
                    <p>
                        When selecting an appropriate game, the user should first select the appropriate symptom and age category of the child, 
                        and then select a title based on the available gaming platforms at the facility. 
                    </p>
                    <img src={require("../styles/searchimage.png")} alt="Search page" height="100px"></img>
                </Col>
            </Row>
        </Container>
        <div className="line"></div>

        <Container className="separator">
        <h3 className="homeText2L">
            Saving this Guide as a Mobile App
        </h3>
            <Row>
                <Col>
                <h2 className="subtitles">
                    Android
                </h2>
                    <p>
                        Launch Chrome on your Android device and go to the webpage you want to save. Once the page has loaded, tap on the vertical ellipsis (three dots) button to reveal more options, then select "Add to Home screen."
                    </p>
                </Col>
                <Col>
                    <h2 className="subtitles">
                        iOS
                    </h2>
                    <p>
                        When selecting an appropriate game, the user should first select the appropriate symptom and age category of the child, 
                        and then select a title based on the available gaming platforms at the facility. 
                    </p>
                </Col>
            </Row>
        </Container>
        <div className="line"></div>

        <Container id="Contacts" className="separator">
            <Row>
                <Col>
                <h3> About Child's Play</h3>
                <img src={require("../styles/cp-logo.png")} alt="Child's Play logo" height="100px"></img>
                    <p>
                    Child's Play is a game industry charity dedicated to improving the lives of children with toys and games in a network of over 150 hospitals worldwide. 
                    </p>
                    <a href="http://childsplaycharity.org"> More </a>
                </Col>
                <Col>
                <h3>Contact Information</h3>
                    <p className="address">
                    <br></br>
                    Child’s Play <br></br>
                        8151 164th Ave NE<br></br>
                        PMB #418<br></br>
                        Redmond, WA 98052 <br></br>
                        <br></br>
                        Facebook: <a href="https://www.facebook.com/ChildsPlayCharity/">ChildsPlayCharity</a><br></br>
                        Twitter: <a href="https://twitter.com/CPCharity/">@CPCharity</a>
                    </p>
                </Col>
            </Row>
        </Container>
        </div>
    )
  }
}

export default LandingPage
