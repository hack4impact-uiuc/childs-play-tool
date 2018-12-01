import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import '../styles/styles.scss'

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
      <body className="dropPageBackground">
      <div className="dropPage">
      <section className="droppedBox">
        <h4>Upload excel sheet with new game data</h4>
        <div className="dropZone">
          <Dropzone onDrop={this.onDrop.bind(this)} className="dropBox">
            <p>Drop excel file here or click to select files to upload</p>
          </Dropzone>
        </div>
        <aside>
          <h4>Files Dropped</h4>
          <ul className="droppedBox">
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </section>
      </div>
    </body>
    )
  }
}

export default Update
