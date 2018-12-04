import React, { Component } from 'react'
import { Link, NavLink as RRNavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap'

import '../styles/landingpage.scss'
import { getAllGames } from '../utils/ApiWrapper'
import { updateResultsAll } from '../redux/modules/results'

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateResultsAll
    },
    dispatch
  )
}
class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  loadAllGames = () => {
    getAllGames().then(results =>
      this.props.updateResultsAll({
        games: results,
        query: { search: '' }
      })
    )
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div className="font">
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
        <Navbar
          color={window.innerWidth >= 550 ? 'dark' : false}
          className={window.innerWidth >= 550 ? false : 'navbar-dark bg-dark'}
          expand={window.innerWidth >= 550}
        >
          <NavbarBrand to="/" tag={RRNavLink}>
            Home
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav
              className={
                window.innerWidth >= 550 ? 'bg-dark ml-auto' : 'bg-dark mr-auto navbar-dark'
              }
              navbar
            >
              <NavItem>
                <NavLink to="/directorPage" tag={RRNavLink}>
                  Admin
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#Contacts">Contact Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#HowToUse">How to Use</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/search" tag={RRNavLink}>
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/results" tag={RRNavLink} onClick={this.loadAllGames}>
                  All Games
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
