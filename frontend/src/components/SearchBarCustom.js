import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateField } from '../redux/modules/searchpage'
import { Form, FormGroup, Input } from 'reactstrap'
import '../styles/styles.scss'
import { SearchBarCustomStrings } from '../strings/english'

const mapStateToProps = state => ({
  nameSearchField: state.searchpage.nameSearchField
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateField
    },
    dispatch
  )
}

class SearchBarCustom extends Component {
  render() {
    return (
      <div>
        <Form className="search" onSubmit={this.props.onSubmit}>
          <FormGroup>
            <Input
              type="search"
              name="search"
              id="exampleSearch"
              placeholder={SearchBarCustomStrings['placeholder']}
              onChange={e => {
                this.props.updateField(this.props.fieldName, e.target.value)
              }}
            />
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarCustom)
