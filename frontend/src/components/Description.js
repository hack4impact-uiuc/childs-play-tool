import React, { Component } from 'react'
import Tag from './Tag'

const descStyle = {}
const titleStyle = {
  fontSize: '30px'
}

class Description extends Component {
  buildTags = this.props.tags.map(t => <Tag type={t.type} tag={t.tag} />)
  render() {
    return (
      <div className="Description" style={descStyle}>
        <div align="center" style={titleStyle}>
          {this.props.title}
        </div>
        <div align="right">
          {this.buildTags}
          <br />
          <br />
          {this.props.summary}
        </div>
        <br />
        {this.props.description}
      </div>
    )
  }
}

export default Description
