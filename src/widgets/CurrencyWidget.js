import React, { Component } from 'react';
import { accounting } from 'accounting';
import PropTypes from 'prop-types';

class CurrencyWidget extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.precision = props.options.precision === undefined ? 2 : props.options.precision;

    accounting.settings = {
      currency: {
        symbol: !props.options.symbol ? "$" : props.options.symbol,   // default currency symbol is '$'
        format: !props.options.format ? "%s%v" : props.options.format, // controls output: %s = symbol, %v = value/number
        decimal: ".",  // decimal point separator
        thousand: ",",  // thousands separator
        precision: this.precision   // decimal places
      },
      number: {
        precision: this.precision,  // default precision on numbers is 0
        thousand: ",",
        decimal: "."
      }
    }

    this.state = {
      ...props,
      precision: this.precision,
      value: accounting.formatMoney(props.value)
    }
  }

  unformat = (value) => {
    return accounting.unformat(value).toFixed(this.precision) * 100;
  }
  handleFormat = (value) => {
    return (accounting.unformat(value) * 100).toFixed(this.precision);
  }

  handleChange = (event) => {
    const { readonly } = this.state;
    const targetValue = this.unformat(event.target.value);
    const isNumber = !event.target.value.match(/[A-Za-z]/g);
    if (isNumber && !readonly) {
      this.setState(
        { value: event.target.value },
        () => this.state.onChange(this.unformat(targetValue))
      );
    }
  }

  handleBlur = (event) => {
    this.state.onChange(this.handleFormat(event.target.value));
    this.setState({ value: accounting.formatMoney(event.target.value) })
  }

  render() {
    const { readonly } = this.state;
    return (
      <input type="text"
        ref={el => this.input = el}
        className="form-control currency"
        style={{ textAlign: "right" }}
        value={this.state.value}
        required={this.state.required}
        readOnly={readonly}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
}

CurrencyWidget.propTypes = {
  options: PropTypes.object.isRequired,
  readonly: PropTypes.bool,
};

CurrencyWidget.defaultProps = {
  readonly: false,
};

export default CurrencyWidget;
