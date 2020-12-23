import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import {
  ArrayFieldTemplate,
  CurrencyWidget,
  PercentWidget,
  RawHTMLField,
  ReactDatePickerWidget,
  ReactSelectWidget,
  ReactSignatureCanvasField,
  StatesWidget,
  ReactDropZoneWidget,
  ReactPhotoGalleryField,
  ReactQRReaderField,
  ReactScannerField,
  ReactTreeSelectField
} from '../../src/index';
import treeOptions from './tree-options';
import './App.css'

import { initListenerAutoResize } from '../../src/utils/helpers';

const widgets = {
  CurrencyWidget: CurrencyWidget,
  PercentWidget: PercentWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactDropZoneWidget: ReactDropZoneWidget,
  ReactSelectWidget: ReactSelectWidget,
  StatesWidget: StatesWidget
};

const fields = {
  RawHTMLField: RawHTMLField,
  ReactPhotoGalleryField: ReactPhotoGalleryField,
  ReactSignatureCanvasField: ReactSignatureCanvasField,
  ReactQRReaderField: ReactQRReaderField,
  ReactScannerField: ReactScannerField,
  ReactTreeSelectField: ReactTreeSelectField,
};

const log = (type) => console.log.bind(console, type);

const schema = {
  type: "object",
  required: [],
  // readOnly: true,
  properties: {
    textarea: {
      title: "Textarea auto resize content",
      type: "string",
    },
    test_react_select_without_enumNames: {
      title: "Test React Select (WITHOUT enumNames)",
      type: "string",
      enum: ["1", "2", "3"]
    },
    test_react_select_with_enumNames: {
      title: "Test React Select (WITH enumNames)",
      type: "string",
      enum: ["1", "2", "3"],
      enumNames: ["One", "Two", "Three"]
    },
    test_react_select_createable: {
      title: "Test React Select (createable)",
      type: "string",
      enum: ["1", "2", "3"]
    },
    test_react_select_array: {
      title: "Test React Select (ARRAY)",
      type: "array",
      items: {
        type: "string",
        enum: ["1", "2", "3"],
        enumNames: ["One", "Two", "Three"]
      },
      uniqueItems: true
    },
    test_react_select_remote: {
      title: "Test React Select (Remote)",
      type: "array",
      items: {
        type: "string",
        enum: []
      },
      uniqueItems: true
    },
    currency: {
      title: "Currency Demo",
      type: "number"
    },
    percent: {
      title: "Percent",
      type: "number"
    },
    date: {
      title: "Date",
      type: "string"
    },
    array_template: {
      type: "array",
      title: "Custom Array Template",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          string: {
            type: "string",
            title: "String"
          },
          checkbox: {
            type: "boolean",
            title: "Checkbox"
          },
          select: {
            type: "string",
            enum: [],
            title: "Remote Select"
          }
        }
      }
    },
    us_states: {
      type: "string",
      title: "US States"
    },
    signature: {
      type: "string",
      title: "Signer",
      format: "data-url"
    },
    raw_html: {
      type: "string",
      title: "Raw HTML"
    },
    react_photo_gallery: {
      title: "Photo Gallery",
      type: "object",
      required: ['attachments'],
      properties: {
        attachments: { type: "array" }
      },
    },
    react_qr_reader: {
      title: 'QR Reader',
      type: 'string'
    },
    react_scanner: {
      title: 'Scanner',
      type: 'string'
    },
    react_tree_select: {
      title: 'Tree Select',
      type: 'array',
      options: treeOptions
    },
    react_remote_tree_select  : {
      title: 'Tree Select Remote',
      type: 'array',
      options: treeOptions
    }
  }
};

const uiSchema = {
  textarea: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4
    },
  },
  test_react_select_with_enumNames: {
    "ui:widget": "ReactSelectWidget"
  },
  test_react_select_without_enumNames: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      "isSearchable": true,
      "isClearable": true,
      "remote": {
        "headers": {},
        "paths": {}
      }
    }
  },
  test_react_select_createable: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      "isCreateable": true,
      "isMulti": true
    }
  },
  test_react_select_array: {
    "ui:widget": "ReactSelectWidget"
  },
  test_react_select_remote: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      "isMulti": true,
      "remote": {
        "url": "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
        "headers": {
          "Authorization": "Bearer keyKM5nPQi7efGQ9Z"
        },
        "paths": {
          "record": ["records"],
          "value": ["id"],
          "label": ["fields", "Name"]
        }
      }
    }
  },
  currency: {
    "ui:widget": "CurrencyWidget",
    "ui:options": {
      "precision": 2
    }
  },
  percent: {
    "ui:widget": "PercentWidget",
    "ui:options": {
      "digits": 0
    }
  },
  date: {
    "ui:widget": "ReactDatePickerWidget",
    "ui:options": {
      "format": {
        "data": "MM-DD-YYYY",
        "display": "DD/MM/YYYY"
      }
    }
  },
  array_template: {
    items: {
      select: {
        "ui:widget": "ReactSelectWidget",
        "ui:options": {
          "isMulti": false,
          "remote": {
            "url": "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
            "headers": {
              "Authorization": "Bearer keyKM5nPQi7efGQ9Z"
            },
            "paths": {
              "record": ["records"],
              "value": ["id"],
              "label": ["fields", "Name"]
            }
          }
        }
      }
    }
  },
  signature: {
    "ui:field": "ReactSignatureCanvasField",
    "ui:options": {
      "width": 300,
      "height": 100
    }
  },
  us_states: {
    "ui:widget": "StatesWidget"
  },
  raw_html: {
    "ui:field": "RawHTMLField",
    "ui:options": { html: "<h1>Hi</h1>" }
  },
  react_photo_gallery: {
    "ui:field": "ReactPhotoGalleryField",
  },
  react_qr_reader: {
    "ui:field": "ReactQRReaderField"
  },
  react_scanner: {
    "ui:field": "ReactScannerField"
  },
  react_tree_select: {
    "ui:field": "ReactTreeSelectField",
  },
  react_remote_tree_select: {
    "ui:field": "ReactTreeSelectField",
    "ui:options": {
      remote: {
        data: [
          {
            id: 1,
            url: "https://run.mocky.io/v3/9602bc55-5152-44de-9cd6-90b06537db57",
            record: ["parents"],
            label: ["name"],
            value: ["value"]
          },
          {
            id: 2,
            parent: 1,
            url: "https://domain.com/path/${parent}",
            record: ["childs"],
            label: ["parent_name"],
            value: ["id"]
          }
        ]
      }
    }
  }
};

const formData = {
  "react_tree_select": ["parent"]
}

class FormComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentDidMount() {
    initListenerAutoResize()
  }

  handleSubmit = (formData) => {
    alert(`submitted data is ${JSON.stringify(formData)}`);
    console.log("submitted", formData);
  }

  render() {
    return (
      <div className="App">
        <br /><br />
        <div className="row">
          <div className="col-md-6">
            <h2>Test Form</h2>
            <br />
            <Form
              formData={formData}
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
              ArrayFieldTemplate={ArrayFieldTemplate}
              widgets={widgets}
              fields={fields}
              onChange={log("changed")}
              onSubmit={this.handleSubmit}
              onError={log("errors")}
            // disabled={true}
            >
              <div>
                <button type="submit" className="btn btn-info" disabled={this.state.schema.readOnly}>Submit</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  return <FormComponent schema={schema} uiSchema={uiSchema} />
}

export default App
