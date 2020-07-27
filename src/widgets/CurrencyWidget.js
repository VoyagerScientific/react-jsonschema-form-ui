import React, { Component } from 'react';
import { accounting } from 'accounting';


class CurrencyWidget extends Component{
  constructor(props){
    super(props);

    this.precision = props.options.precision === undefined ? 2 : props.options.precision;

    accounting.settings = {
    	currency: {
    		symbol : !props.options.symbol ? "$" : props.options.symbol,   // default currency symbol is '$'
    		format: !props.options.format ? "%s%v" : props.options.format, // controls output: %s = symbol, %v = value/number
    		decimal : ".",  // decimal point separator
    		thousand: ",",  // thousands separator
    		precision : this.precision   // decimal places
    	},
    	number: {
    		precision : this.precision,  // default precision on numbers is 0
    		thousand: ",",
    		decimal : "."
    	}
    }

    this.state = {
      ...props,
      precision: this.precision,
      value: accounting.formatMoney(props.value/100)
    }
  }

  render(){
    return (
      <input type="text"
        className="form-control currency"
        style={{textAlign: "right"}}
        value={this.state.value}
        required={this.state.required}
        onBlur={(event) => {
          this.state.onChange((accounting.unformat(event.target.value) * 100).toFixed(this.precision));
          this.setState({value: accounting.formatMoney(event.target.value)})
        }}
        onChange={(event) => {
          this.setState(
            {value: event.target.value},
            () => this.state.onChange(accounting.unformat(this.state.value).toFixed(this.precision) * 100)
          );
        }}
        disabled={this.state.disabled}
        readOnly={this.state.readonly}
      />
    );
  }

}


export default CurrencyWidget;
