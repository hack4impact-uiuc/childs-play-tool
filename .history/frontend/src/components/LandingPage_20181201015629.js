import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import '../styles/styles.scss'
import '../styles/landingpage.scss'

class LandingPage extends Component {
  render() {
    return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro"
          rel="stylesheet"
        />
        <h3 className="homeText">
          Child&#39;s Play Therapeutic Video Game Guide
        </h3>
      </div>
    )
  }
}

export default LandingPage
