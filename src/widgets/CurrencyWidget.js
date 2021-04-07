import React, { Component } from "react";

import { accounting } from "accounting";

class CurrencyWidget extends Component {
  constructor(props) {
    super(props);

    this.precision =
      props.options.precision === undefined ? 2 : props.options.precision;

    accounting.settings = {
      currency: {
        symbol: !props.options.symbol ? "$" : props.options.symbol, // default currency symbol is '$'
        format: !props.options.format ? "%s%v" : props.options.format, // controls output: %s = symbol, %v = value/number
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

  isNumberPressed = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    //regex that accepts numbers only
    if (!/^[0-9]+$/.test(keyValue)) event.preventDefault();
  };

  render() {
    return (
      <>
        <input
          type="text"
          className="form-control currency"
          style={{ textAlign: "right" }}
          value={this.state.value}
          required={this.state.required}
          onKeyPress={(event) => this.isNumberPressed(event)}
          onFocus={(event) => {
            const value = (
              accounting.unformat(event.target.value) * 100
            ).toFixed(this.precision);

            if (!parseInt(value)) {
              //if value is 0 the field will reset. and value will set into empty string
              this.setState({
                value: "",
              });
            } else {
              this.state.onChange(value);
              this.setState({
                value: accounting.unformat(event.target.value),
              });
            }
          }}
          onBlur={(event) => {
            this.state.onChange(
              (accounting.unformat(event.target.value) * 100).toFixed(
                this.precision
              )
            );
            this.setState({
              value: accounting.formatMoney(event.target.value),
            });
          }}
          onChange={(event) => {
            this.setState({ value: event.target.value }, () =>
              this.state.onChange(
                accounting.unformat(this.state.value).toFixed(this.precision) *
                  100
              )
            );
          }}
          disabled={this.state.disabled}
          readOnly={this.state.readonly}
        />
      </>
    );
  }
}

export default CurrencyWidget;
