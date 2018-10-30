import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateField } from '../redux/modules/searchpage'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import '../styles/styles.css'

const mapStateToProps = state => ({
  nameSearchField: state.nameSearchField
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
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Form className="search">
          <FormGroup>
            <Label for="exampleSearch">Search by Name</Label>
            <Input
              type="search"
              name="search"
              id="exampleSearch"
              placeholder="Type name here... "
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
