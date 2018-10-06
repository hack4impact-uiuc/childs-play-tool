import React, { Component } from 'react'

const ageTag = {
  background:"#f998e8",
  color: "white",
  width: "50px"
}
const ailmentTag = {
  background:"#a2f998",
  color: "white",
  width: "50px"
}
const systemTag = {
  background:"#98d1f9",
  color: "white",
  width: "50px"
}

class Tag extends Component {
  drawTags = (type, tag) => {
    if(type == "age"){
      return <div align="center" style={ageTag}>{tag}</div>
    }
    else if(type == "ailment"){
      return <div align="center" style={ailmentTag}>{tag}</div>
    }
    else if(type == "system"){
      return <div align="center" style={systemTag}>{tag}</div>
    }
    else{
      return <div>{tag}</div>
    }
  }
  render() {
    return (
      <div className="Tag">
        {this.drawTags(this.props.type, this.props.tag)}
      </div>
    )
  }
}

export default Tag
