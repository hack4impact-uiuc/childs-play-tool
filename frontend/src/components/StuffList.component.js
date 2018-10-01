// @flow
import React, { Component } from 'react'
import type { StuffListProps } from './../types'

export default class StuffList extends Component<StuffListProps> {
  componentWillMount() {
    this.props.fetchStuff()
  }

  render() {
    const { stuff } = this.props
    return stuff.length > 0 ? (
      stuff.map(thing => <div key={thing}>{thing}</div>)
    ) : (
      <div>No Data</div>
    )
  }
}
