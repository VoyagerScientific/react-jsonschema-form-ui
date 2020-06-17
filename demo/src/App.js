import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import {
  ArrayFieldTemplate,
  CurrencyWidget,
  PercentWidget,
  RawHTMLField,
  ReactDatePickerWidget,
  ReactSelectWidget,
  ReactSignatureCanvasField,
  StatesWidget
} from '../../src/index';
import './App.css';

const widgets = {
  CurrencyWidget: CurrencyWidget,
  PercentWidget: PercentWidget,
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
  readOnly: false,
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
      type: "number",
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
    }
  }
};

const uiSchema = {
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
      "precision": 2,
      "readOnly": true,
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
      "format": "YYYY-MM-DD"
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
  }
};

class FormComponent extends Component {
  render() {
    return (
      <div className="App">
        <br /><br />
        <div className="row">
          <div className="col-md-4">
            <h2>Test Form</h2>
            <br />
            <Form
              schema={this.props.schema}
              uiSchema={this.props.uiSchema}
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
}

class App extends Component {
  state = {
    schema,
  };

  schema = {
    title: "Form Settings",
    type: "object",
    properties: {
      readOnly: {
        type: "boolean",
        title: "Form is read-only",
        enum: [true, false],
      },
    },
  };

  uiSchema = {
    readOnly: {
      "ui:widget": "checkbox",
      "ui:enumDisabled": [true],
    },
  };

  handleSchemaChange = ({ formData }) => {
    this.setState({ schema: formData });
  }

  renderHeaderForm() {
    const { schema: formState } = this.state;
    return (
      <Form
        schema={this.schema}
        uiSchema={this.uiSchema}
        ArrayFieldTemplate={ArrayFieldTemplate}
        formData={formState}
        onChange={this.handleSchemaChange}
      />
    );
  }

  render() {
    const { schema: formState } = this.state;
    return (
      <React.Fragment>
        {this.renderHeaderForm()}
        <FormComponent schema={formState} uiSchema={uiSchema} />
      </React.Fragment>
    );
  };
}

export default App;
