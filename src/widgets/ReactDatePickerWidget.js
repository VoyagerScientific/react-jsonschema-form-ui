import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class ButtonInput extends React.Component {
  handleClick = (e) => {
    e.preventDefault()
    this.props.onClick(e)
  }

  render() {
    return (
      <a
        className="btn btn-sm btn-secondary"
        href={"#!"}
        onClick={this.handleClick}>
        {this.props.value || (<span className="d-print-none">Choose Date</span>)}
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

            let value = date;

            if(this.state.options && this.state.options.format)
              value = moment(date).format(this.state.options.format)

            this.setState(
              {value: date},
              () => this.state.onChange(value)
            );
          }}
          strictParsing
          disabled={this.state.disabled}
          readOnly={this.state.readonly}
        />
      </div>
    );
  }

}


export default ReactDatePickerWidget;
