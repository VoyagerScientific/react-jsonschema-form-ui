import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import TestRenderer from 'react-test-renderer';
// SUT
import ReactDatePickerWidget from './../../src/widgets/ReactDatePickerWidget';
import Form from 'react-jsonschema-form';
// Components
import { WIDGET_MAP, READONLY_SCHEMA } from '../constants';
import { isComponentOfType } from './../utils';
import DatePicker from 'react-datepicker';

chai.should();
chai.use(sinonChai);

const UI_SCHEMA = {
  date: {
    "ui:widget": "ReactDatePickerWidget",
    "ui:options": {
      "format": "YYYY-MM-DD"
    }
  },
};

describe('widgets/ReactDatePickerWidget', () => {
  it('should state be immutable when readonly property is true', () => {
    // given
    const props = { readonly: true };
    const widget = TestRenderer.create(<ReactDatePickerWidget {...props} />);

    // when
    const datepickerInput = widget.root.find((node) => isComponentOfType(node, DatePicker));

    widget.getInstance().should.be.instanceOf(ReactDatePickerWidget);
    datepickerInput.props.readOnly.should.be.true;
  });

  it('should state be editable when readonly property is false', () => {
    // given
    const props = { readonly: false };
    const widget = TestRenderer.create(<ReactDatePickerWidget {...props} />);

    // when
    const datepickerInput = widget.root.find((node) => isComponentOfType(node, DatePicker));

    // then
    widget.getInstance().should.be.instanceOf(ReactDatePickerWidget);
    datepickerInput.props.readOnly.should.be.false;
  });

  it('should state be immutable when readonly property of the form is true', () => {
    // given
    const schema = {
      ...READONLY_SCHEMA,
      properties: {
        date: {
          title: "Date",
          type: "string"
        },
      }
    };
    const form = TestRenderer.create(
      <Form
        schema={schema}
        uiSchema={UI_SCHEMA}
        widgets={WIDGET_MAP}
      />);

    // when
    const datepickerInput = form.root.find((node) => isComponentOfType(node, DatePicker));

    // then
    datepickerInput.props.readOnly.should.be.true;
  });
});