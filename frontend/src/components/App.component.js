// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Jumbotron } from 'react-bootstrap'
import { StuffList } from './'
import './../styles/app.css'

class App extends Component<void> {
  render() {
    return (
      <Jumbotron className="banner">
        <Grid>
          <h1>Hola</h1>
          <Link to="/colors">Colors</Link>
          <StuffList />
        </Grid>
      </Jumbotron>
    )
  }
}

export default App
