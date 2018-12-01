import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container } from 'reactstrap'

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
            <li><a href="/admin" className="cp" >Child's Play</a></li>
            <li><a href="/search" className="rest">Search</a></li>
            <li><a href="/admin" className="rest">Admin</a></li>
            <li><a href="/admin" className="rest">How to Use</a></li>
            <li><a href="" className="rest">Contacts</a></li>
        </ul>
        <h3 className="homeTextL">
          Child&#39;s Play Therapeutic Video Game Guide
        </h3>
        <p>
        The purpose of this guide is to recommend therapeutic video games for children based on their symptoms. 
        The games recommended in this guide were curated by researchers at EEDAR, a market-leading video game research firm.
        </p>
        <div className="blocks">
        <Button>
            Search Games
        </Button>
        </div>
        <a> Click here for English pdf Guide</a> 
        <br></br>
        <a> Click here for Spanish pdf Guide</a>
        <h3 className="homeText2L">
            How to Use
        </h3>
        <div className="inlined">
        <Con
        <p>
            Game recommendations have been categorized into six symptom categories:
        </p>
        <p>
            When selecting an appropriate game, the user should first select the appropriate symptom and age category of the child, 
            and then select a title based on the available gaming platforms at the facility. 
        </p>
        </div>
        </div>
    )
  }
}

export default LandingPage
