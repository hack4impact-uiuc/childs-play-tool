import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import '../styles/styles.scss'
import { Button } from 'reactstrap'
import { sendFile } from '../utils/ApiWrapper'

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
      <section className="droppedBox">
        <h2>Upload excel sheet with new game data</h2>
        <div className="dropZone">
          <Dropzone onDrop={this.onDrop.bind(this)} className="dropBox">
            <p>Drop excel file here or click to select files to upload</p>
          </Dropzone>
        </div>
        <aside>
          <h3>Files Dropped</h3>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
           <Button
              className="right"
              onClick={e =>
                sendFile(this.state.files[0])
              }
            >
              Upload File
            </Button>
        </aside>
      </section>
    )
  }
}

export default Update
