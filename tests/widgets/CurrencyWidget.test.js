import React from 'react';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import TestRenderer, { act } from 'react-test-renderer';
// SUT
import CurrencyWidget from './../../src/widgets/CurrencyWidget';
import Form from 'react-jsonschema-form';
// Components
import { WIDGET_MAP, READONLY_SCHEMA } from '../constants';
import { isComponentInput } from './../utils';

chai.should();
chai.use(sinonChai);

const UI_SCHEMA = {
  currency: {
    "ui:widget": "CurrencyWidget",
    "ui:options": {
      "precision": 2,
    }
  },
};

describe('widgets/CurrencyWidget', () => {
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
    const widget = TestRenderer.create(<CurrencyWidget {...props} />);
    const widgetInput = widget.root.findByType('input');

    // when
    act(() =>
      widgetInput.props.onChange({ target: { value: '$20.00' } })
    );

    // then
    widget.getInstance().should.be.instanceOf(CurrencyWidget);
    onChangeFake.should.not.have.been.called;

  });

  it('should state be editable when readonly property is false', () => {
    // given
    const onChangeFake = sinon.fake();
    const props = {
      options: {
        precision: 2,
      },
      readonly: false,
      onChange: onChangeFake,
    };
    const widget = TestRenderer.create(<CurrencyWidget {...props} />);
    const widgetInput = widget.root.findByType('input');

    // when
    act(() =>
      widgetInput.props.onChange({ target: { value: '$20.00' } })
    );

    // then
    widget.getInstance().should.be.instanceOf(CurrencyWidget);
    onChangeFake.should.have.been.called;
  });

  it('should state be immutable when readonly property of the form is false', () => {
    // given
    const onChangeFake = sinon.fake();
    const currencySchema = {
      ...READONLY_SCHEMA,
      properties: {
        currency: {
          title: "Currency Demo",
          type: "number",
        },
      }
    };
    const form = TestRenderer.create(
      <Form
        schema={currencySchema}
        uiSchema={UI_SCHEMA}
        widgets={WIDGET_MAP}
        onChange={onChangeFake}
      />);
    const currencyWidgetInput = form.root.find((node) => isComponentInput(node));

    // when
    act(() =>
      currencyWidgetInput.props.onChange({ target: { value: '$20.00' } })
    );

    // then
    onChangeFake.should.have.been.calledOnce;
  });
});