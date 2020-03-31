import React from 'react';
import Form from 'react-jsonschema-form';
import { ArrayFieldTemplate, CurrencyWidget, RawHTMLField, ReactDatePickerWidget, ReactSelectWidget, ReactSignatureCanvasField, StatesWidget } from '../../src/index';
import './App.css';

const widgets = {
  CurrencyWidget: CurrencyWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactSelectWidget: ReactSelectWidget,
  StatesWidget: StatesWidget
};

const fields = {
  RawHTMLField: RawHTMLField,
  ReactSignatureCanvasField: ReactSignatureCanvasField
};

const log = (type) => console.log.bind(console, type);

const schema = {
  type: "object",
  required: [],
  properties: {
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
    }
  }
};

const uiSchema = {
  test_react_select_with_enumNames:{
    "ui:widget": "ReactSelectWidget"
  },
  test_react_select_without_enumNames: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      "isSearchable": true,
      "isClearable": true
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
      "remote": {
        "url": "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
        "headers": {
          "Authorization": "Bearer keyWYA1GjpYkevFTp"
        },
        "paths":{
          "record": ["records"],
          "value": ["id"],
          "label": ["fields", "Name"]
        }
      }
    }
  },
  currency: {
    "ui:widget": "CurrencyWidget"
  },
  date: {
    "ui:widget": "ReactDatePickerWidget"
  },
  signature: {
    "ui:field": "ReactSignatureCanvasField"
  },
  us_states: {
    "ui:widget": "StatesWidget"
  },
  raw_html: {
    "ui:field": "RawHTMLField",
    "ui:options": {html: "<h1>Hi</h1>"}
  }
};

function App() {
  return (
    <div className="App">
      <br /><br />
      <div className="row">
        <div className="col-md-4">
          <h2>Test Form</h2>
          <br />
          <Form
            schema={schema}
            uiSchema={uiSchema}
            ArrayFieldTemplate={ArrayFieldTemplate}
            widgets={widgets}
            fields={fields}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
