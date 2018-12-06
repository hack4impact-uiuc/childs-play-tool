import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import '../styles/landingpage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { getAllGames } from '../utils/ApiWrapper'
import { updateResultsAll, beginLoading, endLoading } from '../redux/modules/results'

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateResultsAll,
      beginLoading,
      endLoading
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
    this.props.beginLoading()
    getAllGames().then(results => {
      this.props.updateResultsAll({
        games: results,
        query: { search: '' }
      })
      this.props.endLoading()
    })
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
          className={'navbar-dark bg-dark'}
          expand={window.innerWidth >= 550}
          fixed="top"
        >
          <NavbarBrand to="/" tag={RRNavLink}>
            <FontAwesomeIcon icon={faHome} /> Home
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
                {this.props.location.pathname === '/' ? (
                  <NavLink href="/#Contacts">Contact Us</NavLink>
                ) : (
                  <NavLink to="/#Contacts" tag={RRNavLink}>
                    Contact Us
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
                {this.props.location.pathname === '/' ? (
                  <NavLink href="/#HowToUse">How To Use</NavLink>
                ) : (
                  <NavLink to="/#HowToUse" tag={RRNavLink}>
                    How To Use
                  </NavLink>
                )}
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
