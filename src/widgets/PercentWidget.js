import React, { Component } from 'react';

class PercentWidget extends Component{
  constructor(props){
    super(props);
    this.state = {
      ...props
    }
  }


  _handleChange(event){
    let value = event.target.value.replace(/[^0-9.]/g, "");
    if(event.type === 'blur' && event.target.value)
      value = parseFloat(value).toFixed(2);
    this.setState({value: value});
    this.state.onChange(value);
  }

  render(){
    return (
      <div className="input-group">
        <input type="text"
          className="form-control percent"
          style={{textAlign: "right"}}
          value={this.state.value}
          required={this.state.required}
          onBlur={(event) => {
            this._handleChange(event);
          }}
          onChange={(event) => {
            this._handleChange(event);
          }}
        />
        <div className="input-group-append">
          <span className="input-group-text">%</span>
        </div>
      </div>
    );
  }

}

export default PercentWidget;
