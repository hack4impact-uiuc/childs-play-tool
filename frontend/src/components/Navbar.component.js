// @flow
import React from 'react'
import { Grid, Navbar as BootstrapNavbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <BootstrapNavbar inverse fixedTop>
      <Grid>
        <BootstrapNavbar.Header>
          <BootstrapNavbar.Brand>
            <Link to="/">Hi</Link>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle />
        </BootstrapNavbar.Header>
      </Grid>
    </BootstrapNavbar>
  )
}
