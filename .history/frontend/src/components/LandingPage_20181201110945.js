import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'reactstrap'

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
      </div>
    )
  }
}

export default LandingPage
