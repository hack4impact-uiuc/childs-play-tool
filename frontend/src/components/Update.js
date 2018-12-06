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
      <div
        className="dropPageBackground"
        style={{ paddingTop: window.innerWidth >= 550 ? '10%' : '20%' }}
      >
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
              <ul>
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
        </div>
      </div>
    ) : (
      <Redirect to="/directorPage" />
    )
  }
}

export default connect(mapStateToProps)(Update)
