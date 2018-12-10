import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import '../styles/update.scss'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { loadUpdates, beginLoading, endLoading } from '../redux/modules/auth'
import { sendFile, getUpdates } from '../utils/ApiWrapper'
import { UpdateStrings } from '../strings/english'
import Loader from 'react-loader-spinner'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  updates: state.auth.updates,
  loading: state.auth.loading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadUpdates,
      beginLoading,
      endLoading
    },
    dispatch
  )
}

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      modal: false,
      submissionStatus: ''
    }
  }

  onDrop(files) {
    this.setState({
      files
    })
  }

  convertTime = time => {
    let utc_date = new Date(time)
    let curr = new Date()
    let minutesFromUTC = curr.getTimezoneOffset()
    let local = new Date(utc_date.getTime() - minutesFromUTC * 60000)
    return local.toLocaleString()
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      submissionStatus: UpdateStrings['fileUploaded']
    })
  }

  render() {
    if (this.props.loading) {
      return (
        <div
          className="resultsText"
          style={{ paddingTop: window.innerWidth >= 550 ? '10%' : '20%' }}
        >
          {UpdateStrings['loading']}
          <Loader type="Puff" color="green" height="100" width="100" />
        </div>
      )
    }
    return this.props.authenticated ? (
      <div
        className="dropPageBackground"
        style={{ paddingTop: window.innerWidth >= 550 ? '5%' : '20%' }}
      >
        <div className="dropPage">
          <section className="droppedBox">
            {this.props.updates && this.props.updates.valid ? (
              <text>
                {UpdateStrings['lastUpdate']} {this.convertTime(this.props.updates.valid.time)}
                <br />
              </text>
            ) : null}
            {this.props.updates && this.props.updates.invalid ? (
              <text>
                {UpdateStrings['lastInvalidUpdate']}{' '}
                {this.convertTime(this.props.updates.invalid.time)}
                <br />
              </text>
            ) : null}
            {this.props.updates && (this.props.updates.valid || this.props.updates.invalid) ? (
              <text>
                {UpdateStrings['submissionInfo']}
                <br />
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
              <ul className="droppedFilesBackground">
                {this.state.files.map(f => (
                  <li className="droppedBox" key={f.name}>
                    {f.name} - {f.size} bytes
                  </li>
                ))}
              </ul>
              <Button
                disabled={this.state.files.length === 0}
                className="right"
                onClick={e => {
                  sendFile(this.state.files[0])
                  this.toggle()
                }}
              >
                {UpdateStrings['uploadButton']}
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalBody>{UpdateStrings['fileUploaded']}</ModalBody>
                <ModalFooter>
                  <Button
                    className="invalidSearchButton"
                    onClick={e => {
                      this.toggle()
                      this.props.beginLoading()
                      getUpdates().then(results => {
                        this.props.loadUpdates(results)
                        this.props.endLoading()
                      })
                    }}
                  >
                    {UpdateStrings['return']}
                  </Button>
                </ModalFooter>
              </Modal>
            </aside>
          </section>
          <hr />
          <h4>{UpdateStrings['adminInstructions']}</h4>
          <h5 align="left">{UpdateStrings['uploadInstructionsTitle']}</h5>
          <p align="left">{UpdateStrings['uploadInstructions']}</p>
          <h5 align="left">{UpdateStrings['editGameTitle']}</h5>
          <p align="left">{UpdateStrings['editGame']}</p>
          <h5 align="left">{UpdateStrings['findIncompleteGamesTitle']}</h5>
          <p align="left">{UpdateStrings['findIncompleteGames']}</p>
        </div>
      </div>
    ) : (
      <Redirect to="/directorPage" />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update)
