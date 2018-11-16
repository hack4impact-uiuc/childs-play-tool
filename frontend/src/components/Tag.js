import React, { Component } from 'react'
import '../styles/card.scss'
import Constants from '../utils/Constants.js'
class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: 'tag_' + this.props.type + this.getStyle(this.props.tag)
    }
  }
  getStyle = tag => {
    if (tag === Constants.symptoms[2].value) return '_bored_long'
    else if (tag === Constants.symptoms[1].value) return '_bored_short'
    else if (tag === Constants.symptoms[0].value) return '_anxiety'
    else if (tag === Constants.symptoms[3].value) return '_cognitive'
    else if (tag === Constants.ageRange[0].value) return '_12under'
    else if (tag === Constants.ageRange[1].value) return '_13over'
    else if (tag === 'All Ages') return '_both'
    else return '_' + tag.toLowerCase()
  }
  display = tag => {
    if (this.props.type == 'age') {
      if (tag === Constants.ageRange[0].value) return '12-'
      else if (tag === Constants.ageRange[1].value) return '13+'
      else return this.props.tag
    }
    if (this.props.type == 'gender') {
      if (tag === 'Male') return '♂'
      else if (tag === 'Female') return '♀'
      else return '♂/♀'
    }
  }
  render() {
    return (
      <div className={this.state.style}>
        {this.props.type == 'age' || this.props.type == 'gender'
          ? this.display(this.props.tag)
          : this.props.tag}
      </div>
    )
  }
}

export default Tag
