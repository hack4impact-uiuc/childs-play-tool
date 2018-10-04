import React, { Component } from 'react'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = { submitted: false }
  }

  handleSubmit = () => {
    this.setState({ submitted: true })
  }

  displaySubmit = () => {
    var ret = null
    if (this.state.submitted) {
      ret = <div>Submitted!</div>
    }
    return ret
  }
  render() {
    return (
      <div className="Update">
        <form>
          <label>Upload .csv file here and submit:</label>
          <button onClick={this.handleSubmit} type="button">
            Submit
          </button>
        </form>
        {this.displaySubmit}
      </div>
    )
  }
}

export default Update
