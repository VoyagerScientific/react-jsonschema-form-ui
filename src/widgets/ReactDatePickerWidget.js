import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class ButtonInput extends React.Component {

  render () {
    return (
      <a
        href="javascript:void(0);"
        className="btn btn-primary"
        onClick={this.props.onClick}>
        {this.props.value || "Choose Date"}
      </a>
    )
  }
}

ButtonInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};



class ReactDatePickerWidget extends Component{
  constructor(props){
    super(props);
    this.state = {
      ...props
    }
  }


  render(){
    return (
      <div style={{display: "block"}}>
        <DatePicker
          customInput={<ButtonInput />}
          selected={Date.parse(this.state.value)}
          required={this.state.required}
          onChange={(date) => {
            this.setState(
              {value: date},
              () => this.state.onChange(this.state.value)
            );
          }}
          strictParsing
        />
      </div>
    );
  }

}


export default ReactDatePickerWidget;
