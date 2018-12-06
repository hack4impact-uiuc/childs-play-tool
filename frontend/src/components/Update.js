import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import '../styles/update.scss'
import { Button } from 'reactstrap'
import { sendFile } from '../utils/ApiWrapper'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

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
    return this.props.authenticated ? (
      <div className="dropPageBackground">
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
              <ul className="droppedFilesBackground">
                {this.state.files.map(f => (
                  <li className="droppedBox" key={f.name}>
                    {f.name} - {f.size} bytes
                  </li>
                ))}
              </ul>
              <Button className="right" onClick={e => sendFile(this.state.files[0])}>
                Upload File
              </Button>
            </aside>
          </section>
          <hr/>
          <h4>Instructions</h4>
          <h5 align="left">Uploading a File</h5>
          <p align="left">You can upload a spreadsheet to update the web application in two ways. 
          Clicking the upload box will prompt you to select a file from your computer. You can also drag and drop a file into the box. 
          When the file is successfully uploaded, you can confirm this by looking at the date and time of the last successful upload. 
          If the file fails to upload, you can tell by looking at the last invalid upload date and time.
          </p>
          <h6>Editing a Card</h6>
        </div>
      </div>
    ) : (
      <Redirect to="/directorPage" />
    )
  }
}

export default connect(mapStateToProps)(Update)
