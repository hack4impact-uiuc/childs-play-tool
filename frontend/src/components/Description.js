import React, { Component } from 'react'
import Tag from './Tag'

class Description extends Component {
  buildTags = this.props.tags.map(tag => <Tag tag={tag} />)
  render() {
    return (
      <div className="Description">
        <p>{this.props.title}</p> <br />
        <p>Tags: {this.buildTags}</p>
        <br />
        <p>Summary: {this.props.summary}</p>
        <br />
        <p>Description: {this.props.description}</p>
      </div>
    )
  }
}

export default Description
