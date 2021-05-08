import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { accounting } from "accounting";
import _ from "lodash";
class CurrencyWidget extends Component {
  constructor(props) {
    super(props);

    this.precision =
      props.options.precision === undefined ? 2 : props.options.precision;

    accounting.settings = {
      currency: {
        symbol: !props.options.symbol ? "$" : props.options.symbol, // default currency symbol is '$'
        format: {
          pos: !props.options.format ? "%s%v" : props.options.format,
          neg: !props.options.format ? "%s(%v)" : props.options.format,
          zero: "%s  -- "
        }, // controls output: %s = symbol, %v = value/number
        decimal: ".", // decimal point separator
        thousand: ",", // thousands separator
        precision: this.precision, // decimal places
      },
      number: {
        precision: this.precision, // default precision on numbers is 0
        thousand: ",",
        decimal: ".",
      },
    };

    this.state = {
      ...props,
      precision: this.precision,
      value: accounting.formatMoney(props.value / 100),
    };
  }

  handleFocus = (event) => {
    const value = this.unformat(event.target.value);

    if (!parseInt(value) && !_.startsWith("-")) {
      //if value is 0 the field will reset. and value will set into empty string
      this.setState({
        value: "",
      });
    } else {
      this.props.onChange(value);
      this.setState({
        value: accounting.unformat(event.target.value),
      });
    }
  }

  unformat = (value) => {
    return (accounting.unformat(value) * 100).toFixed(this.precision);
  }

  handleBlur = (event) => {
    const unformattedValue = this.unformat(event.target.value);
    this.props.onChange(unformattedValue);
    this.setState({
      value: accounting.formatMoney(event.target.value),
    });
  }

  handleInputValueChange = (event) => {
    const isNumberAccepted = new RegExp(/(^[-|\+|0-9][0-9]*)(\.*||\.[0-9]*)$/).test(event.target.value);
    if (isNumberAccepted || _.isEmpty(event.target.value)) {
      this.setState({ value: event.target.value });
    }
  };

  render() {
    const { title } = _.get(this.props, "schema", {});

    return (
      <>
        <Form.Label>{title}</Form.Label>
        <input
          type="text"
          className="form-control currency"
          style={{ textAlign: "right" }}
          value={this.state.value}
          required={this.state.required}
          onChange={this.handleInputValueChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          disabled={this.state.disabled}
          readOnly={this.state.readonly}
        />
      </>
    );
  }
}

export default CurrencyWidget;
