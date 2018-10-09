import React, { Component } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

let result = {
  // simulate a result from the backend
  title: 'Mario Kart',
  summary: 'A racing game',
  description: 'A racing game where the most important skill is luck',
  tags: [
    { type: 'age', tag: '0-5' },
    { type: 'system', tag: 'Switch' },
    { type: 'ailment', tag: 'Pain' }
  ]
}
class Results extends Component {
  render() {
    return (
      <div>
        <Card
          title={result.title}
          tags={result.tags}
          summary={result.summary}
          description={result.description}
        />
        <br />
        <Link to={{ pathname: './' }}>Go to home</Link>
      </div>
    )
  }
}

export default Results
