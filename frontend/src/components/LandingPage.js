import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container, Col, Row, Media } from 'reactstrap'
import { LandingPageStrings } from '../strings/english'

import '../styles/landingpage.scss'

class LandingPage extends Component {
  componentDidMount() {
    if (this.props.location.hash) {
      document.querySelector(this.props.location.hash).scrollIntoView()
    }
  }

  render() {
    return (
      <div className="backgroundL">
        <div className="rowcolor">
          <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
          <img
            className="cleared2"
            src={require('../styles/cplogo.png')}
            alt="Child's Play logo"
            height="220px"
          />
          <h3 className="homeTextL">Welcome!</h3>
          <h3 className="subtitles2">Therapeutic&nbsp; Video&nbsp; Game&nbsp; Guide</h3>
          <p className="padded">
            This guide was designed as a quick reference to help caretakers quickly select games for
            their patients. Caretakers can reference the category that best fits the symptoms of the
            patient and select one of the games listed. The games recommended in this guide were
            curated by researchers at EEDAR, a market-leading video game research firm in
            collaboration with mental health researchers at UCSD.
          </p>
          <Link to="/search">
            <Button className="buttonpad">{LandingPageStrings['searchButton']}</Button>
          </Link>
          <div>
            <a href="https://childsplaycharity.org/assets/downloads/booklet.pdf">
              {' '}
              {LandingPageStrings['englishPDF']}
            </a>
            <br />
            <a href="https://childsplaycharity.org/tvgg-es"> {LandingPageStrings['spanishPDF']}</a>
          </div>
          <div className="line" />
        </div>

        <Container id="HowToUse" className="separator">
          <h3 className="homeText2L">{LandingPageStrings['tutorialHeader']}</h3>
          <Row>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial0']}</p>
              <img
                src={require('../styles/searchbyname.png')}
                alt="Search by name field"
                height="80px"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial2']}</p>
              <img
                src={require('../styles/symptoms1.png')}
                alt="Anxiety/Hyperactivity, Bored (Long Term), Bored (Short Term), Cognitive Impairment, Pain, Sadness"
                height="200px"
              />
            </Col>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial3']}</p>
              <img
                src={require('../styles/agecategories.png')}
                alt="12 and under, 13 and older"
                height="200px"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial4']}</p>
              <img src={require('../styles/searchimage.png')} alt="Search page" height="200px" />
            </Col>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial5']}</p>
              <img src={require('../styles/result.png')} alt="Search page" height="110px" />
            </Col>
          </Row>
          <Row>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial6']}</p>
              <img src={require('../styles/inputsave.png')} alt="Search page" height="140px" />
            </Col>
            <Col className="mspace">
              <p>{LandingPageStrings['tutorial7']}</p>
              <img src={require('../styles/loadsave.png')} alt="Search page" height="110px" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{LandingPageStrings['tutorial1']}</p>
              <img
                src={require('../styles/copysearchurl.png')}
                alt="Copy search URL field"
                height="80px"
              />
            </Col>
          </Row>
        </Container>
        <div className="line" />

        <div className="rowcolor2">
          <Container className="separator">
            <h3 className="homeText2L">{LandingPageStrings['mobileGuideHeader']}</h3>
            <Row>
              <Col>
                <h2 className="subtitles">{LandingPageStrings['android']}</h2>
                <p>{LandingPageStrings['androidDesc']}</p>
              </Col>
              <Col>
                <h2 className="subtitles">{LandingPageStrings['iOS']}</h2>
                <p>{LandingPageStrings['iOSDesc']}</p>
              </Col>
            </Row>
          </Container>
          <div className="line" />
        </div>

        <Container id="Contacts" className="separator2">
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
                children with toys and games in a network of over 150 hospitals worldwide. With the
                help of hospital staff, gift wish lists are set up full of video games, toys, books,
                and other fun stuff for kids. These can provide vital distraction from an otherwise
                generally unpleasant experience.
              </p>
              <a href="https://childsplaycharity.org"> Learn More </a>
            </Col>
          </Row>
        </Container>

        <div className="contacts">
          <Container>
            <Row>
              <Col xs="12" sm="6">
                <h3 ref={this.contactRef}>Contact Information </h3>
                <p className="address">
                  Address:
                  <br />
                  Child’s Play <br />
                  9660 153rd Ave NE
                  <br />
                  Redmond, WA 98052
                </p>
              </Col>

              <Col xs="12" sm="6">
                <p>
                  For corporate sponsorships, student or media interviews, or partnership inquiries
                  contact{' '}
                  <a href="childsplaycharity@childsplaycharity.org">
                    childsplaycharity@childsplaycharity.org
                  </a>
                  . For hospital additions, wishlist updates, or beneficiary inquiries contact{' '}
                  <a href="foundations@childsplaycharity.org">foundations@childsplaycharity.org</a>.
                </p>
                <p>
                  Facebook:{' '}
                  <a href="https://www.facebook.com/ChildsPlayCharity/">ChildsPlayCharity</a>
                  <br />
                  Twitter: <a href="https://twitter.com/CPCharity/">@CPCharity</a> <br />
                  <a href="https://childsplaycharity.org/about#contact">
                    {' '}
                    More Contact Information{' '}
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default LandingPage
