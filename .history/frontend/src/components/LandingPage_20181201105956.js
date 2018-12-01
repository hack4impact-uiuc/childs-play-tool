import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
            <li><a href="/search">Search</a></li>
            <li><a href="/admin">Admin</a></li>
            <li><a href="/admin">How to Use</a></li>
            <li><a href="">Contacts</a></li>
        </ul>
        <h3 className="homeText">
          Child&#39;s Play Therapeutic Video Game Guide
        </h3>
      </div>
    )
  }
}

export default LandingPage
