import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import '../styles/update.scss'
import { Button } from 'reactstrap'
import { sendFile } from '../utils/ApiWrapper'
import { UpdateStrings } from '../strings/english'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  updates: state.auth.updates
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
        style={{ paddingTop: window.innerWidth >= 550 ? '5%' : '20%' }}
      >
        <div className="dropPage">
          <section className="droppedBox">
            {this.props.updates && this.props.updates.valid ? (
              <text>
                Database last updated at {this.props.updates.valid.time}
                <br />
              </text>
            ) : null}
            {this.props.updates && this.props.updates.invalid ? (
              <text>
                Invalid attempt at {this.props.updates.invalid.time}
                <br />
              </text>
            ) : null}
            {this.props.updates && (this.props.updates.valid || this.props.updates.invalid) ? (
              <text>
                <br />
              </text>
            ) : null}
            <h4>{UpdateStrings['purpose']}</h4>
            <div className="dropZone">
              <Dropzone onDrop={this.onDrop.bind(this)} className="dropBox">
                <p>{UpdateStrings['instructions']}</p>
              </Dropzone>
            </div>
            <aside>
              <h4>{UpdateStrings['filesDropped']}</h4>
              <ul>
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
        </div>
      </div>
    ) : (
      <Redirect to="/directorPage" />
    )
  }
}

export default connect(mapStateToProps)(Update)
