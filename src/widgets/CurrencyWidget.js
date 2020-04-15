import React, { Component } from 'react';
import { accounting } from 'accounting';


class CurrencyWidget extends Component{
  constructor(props){
    super(props);
    this.state = {
      ...props,
      value: accounting.formatMoney(props.value)
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
          this.state.onChange(accounting.unformat(event.target.value) * 100);
          this.setState({value: accounting.formatMoney(event.target.value)})
        }}
        onChange={(event) => {
          this.setState(
            {value: event.target.value},
            () => this.state.onChange(accounting.unformat(this.state.value) * 100)
          );
        }}
      />
    );
  }

}


export default CurrencyWidget;
