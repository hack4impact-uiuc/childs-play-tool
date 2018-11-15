import React, { Component } from 'react'
import styles from '../styles/results.scss'
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
    else return '_' + tag.toLowerCase()
  }
  ageDisplay = tag => {
    if (tag === '12 and Under') return '12-'
    else if (tag === '13 and Older') return '13+'
    else return tag
  }
  render() {
    return (
      <div className={this.state.style}>
        {this.props.type == 'age' ? this.ageDisplay(this.props.tag) : this.props.tag}
      </div>
    )
  }
}

export default Tag
