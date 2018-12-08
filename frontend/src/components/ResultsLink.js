import queryString from 'query-string'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateResults, beginLoading, endLoading } from '../redux/modules/results'
import { getGames, getGamesByName } from '../utils/ApiWrapper'
import { Redirect } from 'react-router'
import { ResultsLinkStrings } from '../strings/english'

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
      updateResults,
      beginLoading,
      endLoading
    },
    dispatch
  )
}
class ResultsLink extends Component {
  vals = queryString.parse(this.props.location.search)
  nameSearch = () => {
    this.props.beginLoading()
    getGamesByName(this.vals.name).then(results => {
      this.props.updateResults({
        games: results,
        query: { search: this.vals.name }
      })
    })
    this.props.endLoading()
    return <Redirect to="/Results" />
  }
  filterSearch = () => {
    this.props.beginLoading()
    getGames(this.vals.age, this.vals.symptom, this.vals.system, this.vals.gender).then(results => {
      this.props.updateResults({
        games: results,
        query: {
          age: this.vals.age,
          symptom: this.vals.symptom,
          gender: this.vals.gender
        }
      })
    })
    this.props.endLoading()
    return <Redirect to="/Results" />
  }
  render() {
    return (
      <div>
        {this.vals.name ? this.nameSearch() : null}
        {this.vals.age && this.vals.symptom
          ? this.filterSearch()
          : ResultsLinkStrings['invalidURL']}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsLink)
