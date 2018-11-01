import React, { Component } from 'react'
import styles from '../styles/styles.scss'
import {Constants} from '../utils/Constants.js'
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
      style: 'tag_' + this.props.type + this.getStyle(this.props.tag)
    }
  }
  getStyle = tag => {
    if (tag === Constants.symptoms[0].value) return '_bored_long'
    else if (tag === Constants.symptoms[1].value) return '_bored_short'
    else if (tag === Constants.symptoms[3].value) return '_anxiety'  
    else if (tag === Constants.symptoms[5].value) return '_cognitive'
    else if (tag === Constants.ageRange[0].value) return '_12under'
    else if (tag === Constants.ageRange[1].value) return '_13over'
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
