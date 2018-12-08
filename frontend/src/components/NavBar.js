import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import '../styles/landingpage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { getAllGames } from '../utils/ApiWrapper'
import { updateResultsAll, beginLoading, endLoading, updateConsole } from '../redux/modules/results'
import { NavBarStrings } from '../strings/english'

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateResultsAll,
      beginLoading,
      endLoading,
      updateConsole
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

  loadAllGamesFromNavbar = () => {
    this.loadAllGames();
    this.toggleNavbar();
  }

  loadAllGames = () => {
    this.props.beginLoading()
    getAllGames().then(results => {
      this.props.updateResultsAll({
        games: results,
        query: { search: '' }
      })
      if (results && Object.keys(results).length > 0) {
        this.props.updateConsole(Object.keys(results)[0])
      }
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
                <NavLink to="/directorPage" tag={RRNavLink} onClick={this.toggleNavbar}>
                  {NavBarStrings['adminLink']}
                </NavLink>
              </NavItem>
              <NavItem>
                {this.props.location.pathname === '/' ? (
                  <NavLink href="/#Contacts" onClick={this.toggleNavbar}>{NavBarStrings['contactLink']}</NavLink>
                ) : (
                  <NavLink to="/#Contacts" tag={RRNavLink} onClick={this.toggleNavbar}>
                    {NavBarStrings['contactLink']}
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
                {this.props.location.pathname === '/' ? (
                  <NavLink href="/#HowToUse" onClick={this.toggleNavbar}>{NavBarStrings['tutorialLink']}</NavLink>
                ) : (
                  <NavLink to="/#HowToUse" tag={RRNavLink} onClick={this.toggleNavbar}>
                    {NavBarStrings['tutorialLink']}
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
                <NavLink to="/search" tag={RRNavLink} onClick={this.toggleNavbar}>
                  {NavBarStrings['searchLink']}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/results" tag={RRNavLink} onClick={this.loadAllGamesFromNavbar}>
                  {NavBarStrings['gamesLink']}
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
