import React, { Component } from 'react'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = { submitted: false }
  }

  handleSubmit = () => {
    this.setState({ submitted: true })
  }

  render() {
    return (
      <div className="Update">
        <form>
          <label>
            Upload .csv file here and submit:
            <input />
          </label>
          <button onClick={this.handleSubmit} type="button">
            Submit
          </button>
        </form>
        {this.state.submitted && <div>Submitted</div>}
      </div>
    )
  }
}

export default Update
