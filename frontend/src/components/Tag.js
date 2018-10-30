import React, { Component } from 'react'
import styles from '../styles/styles.css'
/* const style = {
  age: {
    background: '#f998e8',
    color: 'white',
    width: '55px'
  },
  symptom: {
    background: '#a2f998',
    color: 'white',
    width: '55px'
  },
  system: {
    background: '#98d1f9',
    color: 'white',
    width: '55px'
  }
}
const defaultStyle = {
  background: 'gray',
  color: 'white',
  width: '55px'
} */
class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: 'tag_' + this.props.type + this.getStyle(this.props.tag.toLowerCase())
    }
  }
  getStyle = tag => {
    if (tag === 'anxiety/hyperactivity') return '_anxiety'
    else if (tag === '12 and under') return '_12under'
    else if (tag === '13 and older') return '_13over'
    else if (tag === 'bored (short term)') return '_bored_short'
    else if (tag === 'bored (long term)') return '_bored_long'
    else if (tag === 'cognitive impairment') return '_cognitive'
    else return '_' + tag
  }
  ageDisplay = tag => {
    if (tag === '12 and Under') return '12-'
    else if (tag === '13 and Older') return '13+'
    else return tag
  }
  render() {
    return (
      <div className={this.state.style} align="center">
        {this.props.type == 'age' ? this.ageDisplay(this.props.tag) : this.props.tag}
      </div>
    )
  }
}

export default Tag
