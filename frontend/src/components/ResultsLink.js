import queryString from 'query-string'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateResults } from '../redux/modules/results'
import { getGames, getGamesByName } from '../utils/ApiWrapper'
import { Redirect } from 'react-router'

const mapStateToProps = state => ({
  results: state.results.games,
  system: state.searchpage.consoles,
  age: state.results.query.age,
  symptom: state.results.query.symptom,
  gender: state.results.query.gender,
  search: state.results.query.search
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateResults
    },
    dispatch
  )
}
class ResultsLink extends Component {
  vals = queryString.parse(this.props.location.search)
  nameSearch = () => {
    getGamesByName(this.vals.name).then(results =>
      this.props.updateResults({
        games: results,
        query: { search: this.vals.name }
      })
    )
    return <Redirect to="/Results" />
  }
  filterSearch = () => {
    getGames(this.vals.age, this.vals.symptom, this.vals.system, this.vals.gender).then(results =>
      this.props.updateResults({
        games: results,
        query: {
          age: this.vals.age,
          symptom: this.vals.symptom,
          gender: this.vals.gender
        }
      })
    )
    return <Redirect to="/Results" />
  }
  render() {
    return (
      <div>
        {this.vals.name ? this.nameSearch() : null}
        {this.vals.age && this.vals.symptom ? this.filterSearch() : 'Invalid URL'}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsLink)
