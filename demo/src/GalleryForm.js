import React, { Component } from 'react'
import Form from 'react-jsonschema-form'

import { ReactPhotoGalleryField } from '../../src/index'

class GalleryFormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: galleryFields,
      schema: gallerySchema,
      uiSchema: galleryUiSchema
    }
  }

  onChange = (e) => {
    console.log('__onChange', e)
  }

  onSubmit = (e) => {
    console.log('__onSubmit', e)
  }

  onError = e => {
    console.log('__onError', e)
  }

  render() {
    return (
      <div className="App">
        <br /><br />
        <h2 className="no-print">Gallery Form</h2>
        <br />
        <Form
          schema={this.state.schema}
          uiSchema={this.state.uiSchema}
          fields={this.state.fields}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onError={this.onError}
        />
      </div>
    )
  }
}

const galleryFields = {
  ReactPhotoGalleryField: ReactPhotoGalleryField
}

const galleryUiSchema = {
  react_photo_gallery: {
    "ui:field": "ReactPhotoGalleryField",
  }
}

const gallerySchema = {
  type: "object",
  properties: {
    react_photo_gallery: {
      title: "Gallery",
      type: "object",
      required: ['attachments'],
      properties: {
        attachments: { type: "array" }
      },
    },
  }
}

export default GalleryFormComponent
