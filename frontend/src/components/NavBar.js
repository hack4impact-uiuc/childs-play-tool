import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

const mapStateToProps = state => ({
  results: state.results.games,
})
class NavBar extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  loadAllGames = () => {
    getAllGames().then(results =>
      this.props.updateResults({
        games: results,
        query: {}
      })
    )
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    if (window.innerWidth >= 550) {
      return <div>
          <Navbar color="dark" expand>
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav className="bg-dark ml-auto" navbar>
                <NavItem>
                  <NavLink href="/directorPage">Admin</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Contacts">Contact Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#HowToUse">How to Use</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/search">Search</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/results" onClick={this.loadAllGames}>All Games</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    } else {
      return <div>
          <link href="https://fonts.googleapis.com/css?family=Poppins|Source+Sans+Pro" rel="stylesheet" />
          <Navbar className="navbar-dark bg-dark">
            <Link to="/">
              <NavbarBrand>Home</NavbarBrand>
            </Link>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav className="bg-dark mr-auto navbar-dark" navbar>
                <NavItem>
                  <NavLink href="/directorPage">Admin</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#Contacts">Contact Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#HowToUse">How to Use</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/search">Search</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/results" onClick={this.loadAllGames}>All Games</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    }
  }
}

export default NavBar
