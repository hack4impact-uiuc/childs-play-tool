import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import '../styles/update.scss'
import { Button } from 'reactstrap'
import { sendFile } from '../utils/ApiWrapper'
import { UpdateStrings } from '../strings/english'

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
            <h4>{UpdateStrings['purpose']}</h4>
            <div className="dropZone">
              <Dropzone onDrop={this.onDrop.bind(this)} className="dropBox">
                <p>{UpdateStrings['instructions']}</p>
              </Dropzone>
            </div>
            <aside>
<<<<<<< HEAD
              <h4>Files Dropped</h4>
              <ul className="droppedFilesBackground">
=======
              <h4>{UpdateStrings['filesDropped']}</h4>
              <ul>
>>>>>>> 8b61ff51742f09a4be4a739128928ed8af74a025
                {this.state.files.map(f => (
                  <li className="droppedBox" key={f.name}>
                    {f.name} - {f.size} bytes
                  </li>
                ))}
              </ul>
              <Button className="right" onClick={e => sendFile(this.state.files[0])}>
                {UpdateStrings['uploadButton']}
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
