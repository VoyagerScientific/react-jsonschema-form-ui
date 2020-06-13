import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import TestRenderer from 'react-test-renderer';
// SUT
import ReactSelectWidget from './../../src/widgets/ReactSelectWidget';
import Form from 'react-jsonschema-form';
// Components
import { WIDGET_MAP, READONLY_SCHEMA } from '../constants';
import { isComponentOfType } from './../utils';

chai.should();
chai.use(sinonChai);

const UI_SCHEMA = {
  select_enums: {
    "ui:widget": "ReactSelectWidget",
  },
};

describe('widgets/ReactSelectWidget', () => {
  it('should state be immutable when readonly property is true', () => {
    // given
    const props = {
      readonly: true,
    };
    const widget = TestRenderer.create(<ReactSelectWidget {...props} />);

    // when
    const reactSelectInput = widget.root.instance.input;

    widget.getInstance().should.be.instanceOf(ReactSelectWidget);
    reactSelectInput.props.isDisabled.should.be.true;
  });

  it('should state be editable when readonly property is false', () => {
    // given
    const props = { readonly: false };
    const widget = TestRenderer.create(<ReactSelectWidget {...props} />);

    // when
    const reactSelectInput = widget.root.instance.input;

    widget.getInstance().should.be.instanceOf(ReactSelectWidget);
    reactSelectInput.props.isDisabled.should.be.false;
  });

  it('should state be immutable when readonly property of the form is true', () => {
    // given
    const schema = {
      ...READONLY_SCHEMA,
      properties: {
        select_enums: {
          title: "Test React Select (WITHOUT enumNames)",
          type: "string",
          enum: ["1", "2", "3"]
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

    // when
    const widget = form.root.find((node) => isComponentOfType(node, ReactSelectWidget));
    const reactSelectInput = widget.instance.input;

    // then
    reactSelectInput.props.isDisabled.should.be.true;
  });
});