import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    })
  }

  render() {
    return (
      <section>
        <div className="Update">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Drop updated csv file here, or click to select files to upload</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </section>
    )
  }
}

export default Update
