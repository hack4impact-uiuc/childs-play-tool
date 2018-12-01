import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import '../styles/styles.scss'
import '../styles/searchpage.scss'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
}
class LandingPage extends Component {
  render() {
    return (
      <div className="background">
        <link
          href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro"
          rel="stylesheet"
        />
        <h3 className="homeText">
          Child&#39;s Play
          <br />
          Therapeutic Video Game Guide
        </h3>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)
