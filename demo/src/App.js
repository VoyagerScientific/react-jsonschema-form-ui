import React, { Component } from "react";
import Form from "../../src/forms/index";
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
  ReactInputTableWidget,
  ReactPlaceField,
  ReactPlaceAutofillField,
  ReactPhotoGalleryField,
  ReactQRReaderField,
  ReactScannerField,
  ReactTreeSelectField,
} from "../../src/index";
import treeOptions from "./tree-options";
import "./App.css";

import { initListenerAutoResize } from "../../src/utils/helpers";

const fileUploadProps = {
  options: {
    fileUploadUrl: "/api/users",
    authenticity_token: "",
  },
};

ReactPhotoGalleryField.defaultProps = fileUploadProps;

const widgets = {
  CurrencyWidget: CurrencyWidget,
  PercentWidget: PercentWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactDropZoneWidget: ReactDropZoneWidget,
  ReactSelectWidget: ReactSelectWidget,
  StatesWidget: StatesWidget,
  ReactInputTableWidget: ReactInputTableWidget,
};

const fields = {
  RawHTMLField: RawHTMLField,
  ReactPlaceField: ReactPlaceField,
  ReactPlaceAutofillField: ReactPlaceAutofillField,
  ReactPhotoGalleryField: ReactPhotoGalleryField,
  ReactSignatureCanvasField: ReactSignatureCanvasField,
  ReactQRReaderField: ReactQRReaderField,
  ReactScannerField: ReactScannerField,
  ReactTreeSelectField: ReactTreeSelectField,
  ReactInputTableWidget: ReactInputTableWidget,
  ReactFormulaField: ReactFormulaField,
};

const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com";
const API_END_POINT = "https://602105a446f1e40017803b1d.mockapi.io/photos";

const withCors = (url) => {
  return `${CORS_ANYWHERE}/${url}`;
};

const log = (type) => console.log.bind(console, type);

const schema = {
  type: "object",
  // readOnly: true,
  required: [
    "prepopulated_address",
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
        enum: [""],
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
            enum: [""],
            title: "Remote Select",
          },
        },
      },
    },
    us_states: {
      type: "string",
      title: "US States",
    },
    react_place_field: {
      type: "string",
      title: "Places",
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
      items: {
        type: "string",
      },
    },
    react_remote_tree_select: {
      title: "Tree Select Remote",
      type: "array",
      items: {
        type: "string",
        // enum: [""],
      },
      // uniqueItems: true,
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
    prepopulated_address: {
      title: "Prepopulated Address",
      type: "object",
    },
    first_address: {
      title: "First Address (Prepopulated)",
      type: "string",
    },
    second_address: {
      title: "Second Address (Prepopulated)",
      type: "string",
    },
    city: {
      title: "City (Prepopulated)",
      type: "string",
    },
    state: {
      title: "State (Prepopulated)",
      type: "string",
    },
    country: {
      title: "Country (Prepopulated)",
      type: "string",
    },
    postcode: {
      title: "Postal Code (Prepopulated)",
      type: "string",
    },
    latitude: {
      title: "Latitude (Prepopulated)",
      type: "string",
    },
    longitude: {
      title: "Longitude (Prepopulated)",
      type: "string",
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
    input_table_checkbox: {
      title: "Input Table (Checkbox)",
      type: "object",
      properties: {
        "Service Quality": {
          type: "array",
          items: {
            type: "string",
          },
        },
        Cleanliness: {
          type: "array",
          items: {
            type: "string",
          },
        },
        Responsiveness: {
          type: "array",
          items: {
            type: "string",
          },
        },
        Friendliness: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    input_table_radio: {
      title: "Input Table (Radio)",
      type: "object",
      properties: {
        "Service Quality": {
          type: "string",
        },
        Cleanliness: {
          type: "string",
        },
        Responsiveness: {
          type: "string",
        },
        Friendliness: {
          type: "string",
        },
      },
    },
    input_table_button: {
      title: "Risk Matrix: Likelihood x Consequences",
      type: "object",
      properties: {
        row: {
          type: "string",
        },
        column: {
          type: "string",
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
      isCreateable: true, //props
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
  react_place_field: {
    "ui:field": "ReactPlaceField",
    "ui:options": {
      api: "AIzaSyDbrX2Eez6sb3gPBE-NIESdJfCHFrCUbCU",
    },
  },
  raw_html: {
    "ui:field": "RawHTMLField",
    "ui:options": { html: "<h1>Hi</h1>" },
  },
  react_photo_gallery: {
    "ui:field": "ReactPhotoGalleryField",
    "ui:options": {
      "targetRowHeight": 400
    }
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
      treeOptions: [...treeOptions],
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
  prepopulated_address: {
    "ui:field": "ReactPlaceAutofillField",
    "ui:options": {
      api: "AIzaSyDbrX2Eez6sb3gPBE-NIESdJfCHFrCUbCU",
      showFields: true,
      updateAdjacentFields: true,
      fields: {
        address_1: "first_address",
        address_2: "second_address",
        city: "city",
        state: "state",
        postal_code: "postcode",
        country: "country",
      },
    },
  },
  input_table_checkbox: {
    "ui:field": "ReactInputTableWidget",
    "ui:options": {
      inputTableType: "checkbox",
      rows: [
        "Service Quality",
        "Cleanliness",
        "Responsiveness",
        "Friendliness",
      ],
      columns: [
        "Not Satisfied",
        "Somewhat Satisfied",
        "Satisfied",
        "Very Satisfied",
      ],
    },
  },
  input_table_radio: {
    "ui:field": "ReactInputTableWidget",
    "ui:options": {
      inputTableType: "radio",
      rows: [
        "Service Quality",
        "Cleanliness",
        "Responsiveness",
        "Friendliness",
      ],
      columns: [
        "Not Satisfied",
        "Somewhat Satisfied",
        "Satisfied",
        "Very Satisfied",
      ],
    },
  },
  input_table_button: {
    "ui:field": "ReactInputTableWidget",
    "ui:options": {
      inputTableType: "button",
      rows: [
        "Very Likely (5)",
        "Likely (4)",
        "Possible (3)",
        "Unlikely (2)",
        "Very Unlikely (1)",
      ],
      columns: [
        "Negligible (1)",
        "Minor (2)",
        "Moderate(3)",
        "Significant (4)",
        "Severe (5)",
      ],
      values: [
        [5, 10, 20, 20, 25],
        [4, 8, 12, 16, 20],
        [3, 6, 9, 12, 15],
        [2, 4, 6, 8, 10],
        [1, 2, 3, 4, 5],
      ],
    },
  },
};

const formData = {
  react_tree_select: ["child1", "child2", "child3"],
  test_react_select_remote: ["rec6hO5uh6A7BlgNA", "rec7nPdth3A1pkpPw"],
  react_dropzone: [],
  react_dropzone_2: [],
  react_formula_field: [
    { a: 1, b: 2 },
    { a: 2, b: 4 },
    { a: 3, b: 6 },
  ],
  input_table_checkbox: {
    Cleanliness: ["Satisfied", "Somewhat Satisfied"],
    "Service Quality": ["Somewhat Satisfied"],
    Responsiveness: ["Not Satisfied", "Very Satisfied"],
    Friendliness: ["Satisfied"],
  },
  input_table_radio: {
    Cleanliness: "Somewhat Satisfied",
    "Service Quality": "Not Satisfied",
    Responsiveness: "Satisfied",
    Friendliness: "Very Satisfied",
  },
  input_table_button: {
    row: "Critical",
    column: "Low",
    value: 10,
  },
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
              schema={this.state.schema} //declaration of data types
              uiSchema={this.state.uiSchema}
              ArrayFieldTemplate={ArrayFieldTemplate}
              widgets={widgets}
              fields={fields}
              noHtmlValidate
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
