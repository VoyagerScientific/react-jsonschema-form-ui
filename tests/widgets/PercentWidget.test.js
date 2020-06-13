import React from 'react';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import TestRenderer, { act } from 'react-test-renderer';
// SUT
import PercentWidget from './../../src/widgets/PercentWidget';
import Form from 'react-jsonschema-form';
// Components
import { WIDGET_MAP, READONLY_SCHEMA } from '../constants';
import { isComponentInput } from './../utils';

chai.should();
chai.use(sinonChai);

const UI_SCHEMA = {
  percent: {
    "ui:widget": "PercentWidget",
    "ui:options": {
    }
  },
};

describe('widgets/PercentWidget', () => {
  it('should state be immutable when readonly property is true', () => {
    // given
    const onChangeFake = sinon.fake();
    const props = {
      options: {
        precision: 2,
      },
      readonly: true,
      onChange: onChangeFake,
    };
    const widget = TestRenderer.create(<PercentWidget {...props} />);
    const widgetInput = widget.root.findByType('input');

    // when
    act(() =>
      widgetInput.props.onChange({ target: { value: '10' } })
    );

    widget.getInstance().should.be.instanceOf(PercentWidget);
    onChangeFake.should.not.have.been.called;
    chai.should().equal(widgetInput.props.value, '');
  });

  it('should state be editable when readonly property is false', () => {
    // given
    const onChangeFake = sinon.fake();
    const props = {
      options: {
        precision: 2,
        readonly: false,
      },
      onChange: onChangeFake,
    };
    const widget = TestRenderer.create(<PercentWidget {...props} />);
    const widgetInput = widget.root.findByType('input');

    // when
    act(() =>
      widgetInput.props.onChange({ target: { value: '$20.00' } })
    );

    // then
    widget.getInstance().should.be.instanceOf(PercentWidget);
    widgetInput.props.value.should.be.equal('20.00');
    onChangeFake.should.have.been.called;
  });

  it('should state be immutable when readonly property of the form is false', () => {
    // given
    const onChangeFake = sinon.fake();
    const percentSchema = {
      ...READONLY_SCHEMA,
      properties: {
        percent: {
          title: "Percent Demo",
          type: "number",
        },
      }
    };
    const form = TestRenderer.create(
      <Form
        schema={percentSchema}
        uiSchema={UI_SCHEMA}
        widgets={WIDGET_MAP}
        onChange={onChangeFake}
      />);
    const percentWidgetInput = form.root.find((node) => isComponentInput(node));

    // when
    act(() =>
      percentWidgetInput.props.onChange({ target: { value: '$20.00' } })
    );

    // then
    onChangeFake.should.have.been.calledOnce;
    chai.should().equal(percentWidgetInput.props.value, '');
  });
});