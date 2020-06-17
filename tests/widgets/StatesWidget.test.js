import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import TestRenderer from 'react-test-renderer';
// SUT
import StatesWidget from './../../src/widgets/StatesWidget';
import Form from 'react-jsonschema-form';
// Components
import { WIDGET_MAP, READONLY_SCHEMA } from '../constants';
import { isComponentOfType } from './../utils';

chai.should();
chai.use(sinonChai);

const UI_SCHEMA = {
  state: {
    "ui:widget": "StatesWidget",
  },
};

describe('widgets/StatesWidget', () => {
  it('should state be immutable when readonly property is true', () => {
    // given
    const props = {
      readonly: true,
    };
    const widget = TestRenderer.create(<StatesWidget {...props} />);

    // when
    const selectInput = widget.root.find((node) => node.type === 'select');

    widget.getInstance().should.be.instanceOf(StatesWidget);
    selectInput.props.readOnly.should.be.true;
    selectInput.props.disabled.should.be.true;
  });

  it('should state be editable when readonly property is false', () => {
    // given
    const props = {
      readonly: false,
    };
    const widget = TestRenderer.create(<StatesWidget {...props} />);

    // when
    const selectInput = widget.root.find((node) => node.type === 'select');

    widget.getInstance().should.be.instanceOf(StatesWidget);
    selectInput.props.readOnly.should.be.false;
    selectInput.props.disabled.should.be.false;
  });

  it('should state be immutable when readonly property of the form is true', () => {
    // given
    const schema = {
      ...READONLY_SCHEMA,
      properties: {
        state: {
          title: "State",
          type: "string",
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
    const widget = form.root.find((node) => isComponentOfType(node, StatesWidget));
    const selectInput = widget.find((node) => node.type === 'select');

    // then
    selectInput.props.readOnly.should.be.true;
    selectInput.props.disabled.should.be.true;
  });
});