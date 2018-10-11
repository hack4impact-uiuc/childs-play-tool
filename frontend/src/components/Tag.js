import React, { Component } from 'react'
const style = {
  age: {
    background: '#f998e8',
    color: 'white',
    width: '55px'
  },
  ailment: {
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

class Tag extends Component {
  render() {
    return (
      <div className="Tag" align="center" style={style[this.props.type]}>
        {this.props.tag}
      </div>
    )
  }
}

export default Tag
