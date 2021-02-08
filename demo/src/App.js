import React, { Component } from "react";
import Form from "react-jsonschema-form";
import {
  ArrayFieldTemplate,
  CurrencyWidget,
  PercentWidget,
  ReactFormulaField,
  RawHTMLField,
  ReactDatePickerWidget,
  ReactSelectWidget,
  ReactSignatureCanvasField,
  StatesWidget,
  ReactDropZoneWidget,
  ReactPhotoGalleryField,
  ReactQRReaderField,
  ReactScannerField,
  ReactTreeSelectField,
} from "../../src/index";
import treeOptions from "./tree-options";
import "./App.css";

import { initListenerAutoResize } from "../../src/utils/helpers";

const widgets = {
  CurrencyWidget: CurrencyWidget,
  PercentWidget: PercentWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactDropZoneWidget: ReactDropZoneWidget,
  ReactSelectWidget: ReactSelectWidget,
  StatesWidget: StatesWidget,
};

const fields = {
  RawHTMLField: RawHTMLField,
  ReactPhotoGalleryField: ReactPhotoGalleryField,
  ReactSignatureCanvasField: ReactSignatureCanvasField,
  ReactQRReaderField: ReactQRReaderField,
  ReactScannerField: ReactScannerField,
  ReactTreeSelectField: ReactTreeSelectField,
  ReactFormulaField: ReactFormulaField,
};
const API_END_POINT = "https://602105a446f1e40017803b1d.mockapi.io/photos";

const log = (type) => console.log.bind(console, type);

const schema = {
  type: "object",
  // readOnly: true,
  required: [
    "react_dropzone",
    "react_dropzone_2",
    "test_react_select_without_enumNames",
  ],
  properties: {
    textarea: {
      title: "Textarea auto resize content",
      type: "string",
    },
    test_react_select_without_enumNames: {
      title: "Test React Select (WITHOUT enumNames)",
      type: "string",
      enum: ["1", "2", "3"],
    },
    test_react_select_with_enumNames: {
      title: "Test React Select (WITH enumNames)",
      type: "string",
      enum: ["1", "2", "3"],
      enumNames: ["One", "Two", "Three"],
    },
    test_react_select_createable: {
      title: "Test React Select (createable)",
      type: "string",
      enum: ["1", "2", "3"],
    },
    test_react_select_array: {
      title: "Test React Select (ARRAY)",
      type: "array",
      items: {
        type: "string",
        enum: ["1", "2", "3"],
        enumNames: ["One", "Two", "Three"],
      },
      uniqueItems: true,
    },
    test_react_select_remote: {
      title: "Test React Select (Remote)",
      type: "array",
      items: {
        type: "string",
        enum: [],
      },
      uniqueItems: true,
    },
    currency: {
      title: "Currency Demo",
      type: "number",
    },
    percent: {
      title: "Percent",
      type: "number",
    },
    date: {
      title: "Date",
      type: "string",
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
            title: "String",
          },
          checkbox: {
            type: "boolean",
            title: "Checkbox",
          },
          select: {
            type: "string",
            enum: [],
            title: "Remote Select",
          },
        },
      },
    },
    us_states: {
      type: "string",
      title: "US States",
    },
    signature: {
      type: "string",
      title: "Signer",
      format: "data-url",
    },
    raw_html: {
      type: "string",
      title: "Raw HTML",
    },
    react_photo_gallery: {
      title: "Photo Gallery",
      type: "object",
      required: ["attachments"],
      properties: {
        attachments: { type: "array" },
      },
    },
    react_dropzone: {
      title: "Dropzone",
      minItems: 1,
      type: "array",
      items: {
        type: "string",
        format: "data-url",
      },
      // required: true
    },
    react_dropzone_2: {
      title: "Dropzone (Duplicate)",
      minItems: 1,
      type: "array",
      items: {
        type: "string",
        format: "data-url",
      },
      // required: true
    },
    react_qr_reader: {
      title: "QR Reader",
      type: "string",
    },
    react_scanner: {
      title: "Scanner",
      type: "string",
    },
    react_tree_select: {
      title: "Tree Select",
      type: "array",
    },
    react_remote_tree_select: {
      title: "Tree Select Remote",
      type: "array",
    },
    react_formula_field: {
      title: "Calculations",
      type: "array",
      items: {
        type: "object",
        properties: {
          a: {
            type: "number",
          },
          b: {
            type: "number",
          },
          c: {
            type: "number",
            readOnly: true,
          },
        },
      },
    },
  },
};

const uiSchema = {
  textarea: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4,
    },
  },
  test_react_select_with_enumNames: {
    "ui:widget": "ReactSelectWidget",
  },
  test_react_select_without_enumNames: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isSearchable: true,
      isClearable: true,
      remote: {
        headers: {},
        paths: {},
      },
    },
  },
  test_react_select_createable: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isCreateable: true,
      isMulti: true,
    },
  },
  test_react_select_array: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isList: true,
    },
  },
  test_react_select_remote: {
    "ui:widget": "ReactSelectWidget",
    "ui:options": {
      isMulti: true,
      remote: {
        url:
          "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
        headers: {
          Authorization: "Bearer keyKM5nPQi7efGQ9Z",
        },
        paths: {
          record: ["records"],
          value: ["id"],
          label: ["fields", "Name"],
        },
      },
    },
  },
  currency: {
    "ui:widget": "CurrencyWidget",
    "ui:options": {
      precision: 2,
    },
  },
  percent: {
    "ui:widget": "PercentWidget",
    "ui:options": {
      digits: 0,
    },
  },
  date: {
    "ui:widget": "ReactDatePickerWidget",
    "ui:options": {
      format: {
        data: "MM-DD-YYYY",
        display: "DD/MM/YYYY",
      },
    },
  },
  array_template: {
    items: {
      select: {
        "ui:widget": "ReactSelectWidget",
        "ui:options": {
          isMulti: false,
          remote: {
            url:
              "https://api.airtable.com/v0/appB2bqf1uwbjCLul/Assignees?&view=Main%20View",
            headers: {
              Authorization: "Bearer keyKM5nPQi7efGQ9Z",
            },
            paths: {
              record: ["records"],
              value: ["id"],
              label: ["fields", "Name"],
            },
          },
        },
      },
    },
  },
  signature: {
    "ui:field": "ReactSignatureCanvasField",
    "ui:options": {
      width: 300,
      height: 100,
    },
  },
  us_states: {
    "ui:widget": "StatesWidget",
  },
  raw_html: {
    "ui:field": "RawHTMLField",
    "ui:options": { html: "<h1>Hi</h1>" },
  },
  react_photo_gallery: {
    "ui:field": "ReactPhotoGalleryField",
    "ui:options": {
      fileUploadUrl: API_END_POINT,
      authenticity_token: "",
    },
  },
  react_dropzone: {
    "ui:widget": "ReactDropZoneWidget",
    fieldType: "react-drop-zone",
    "ui:options": {
      accepted: ["image/*", "application/pdf"],
      withFileDisplay: true,
    },
  },
  react_dropzone_2: {
    "ui:widget": "ReactDropZoneWidget",
    fieldType: "react-drop-zone",
    "ui:options": {
      accepted: ["application/pdf"],
      withFileDisplay: true,
    },
  },
  react_qr_reader: {
    "ui:field": "ReactQRReaderField",
  },
  react_scanner: {
    "ui:field": "ReactScannerField",
  },
  react_tree_select: {
    "ui:field": "ReactTreeSelectField",
    "ui:options": {
      treeOptions: treeOptions,
    },
  },
  react_formula_field: {
    "ui:field": "ReactFormulaField",
    "ui:options": {
      formulas: {
        c: "a[i]+b[i]",
      },
      confirmRemove: true,
      removable: true,
      height: 200,
      width: "100%",
    },
  },
  react_remote_tree_select: {
    "ui:field": "ReactTreeSelectField",
    "ui:options": {
      isCreateable: false,
      isMulti: true,
      remote: {
        data: [
          {
            id: 1,
            url: "https://5fe385bb8bf8af001766e7a1.mockapi.io/homes",
            record: ["items"],
            label: ["name"],
            value: ["id"],
          },
          {
            id: 2,
            parent: 3,
            url:
              "https://5fe385bb8bf8af001766e7a1.mockapi.io/homes/{{parent[0]}}/appliances/{{parent[1]}}/parts",
            record: ["parts"],
            label: ["item"],
            value: ["partCode"],
          },
          {
            id: 3,
            parent: 1,
            url:
              "https://5fe385bb8bf8af001766e7a1.mockapi.io/homes/{{parent[0]}}/appliances",
            record: ["items"],
            label: ["appliance"],
            value: ["code"],
          },
        ],
      },
    },
  },
};

const formData = {
  react_tree_select: ["child1", "child2", "child3"],
  react_dropzone: [],
  react_dropzone_2: [],
  react_formula_field: [
    { a: 1, b: 2 },
    { a: 2, b: 4 },
    { a: 3, b: 6 },
  ],
};

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  componentDidMount() {
    initListenerAutoResize();
  }

  handleSubmit = (formData) => {
    alert(`submitted data is ${JSON.stringify(formData)}`);
    console.log("submitted", formData);
  };

  render() {
    return (
      <div className="App">
        <br />
        <br />
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
              liveValidate
              onChange={log("changed")}
              onSubmit={this.handleSubmit}
              onError={log("errors")}
              showErrorList={true}
            >
              <div>
                <button
                  type="submit"
                  className="btn btn-info"
                  disabled={this.state.schema.readOnly}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return <FormComponent schema={schema} uiSchema={uiSchema} />;
}

export default App;
