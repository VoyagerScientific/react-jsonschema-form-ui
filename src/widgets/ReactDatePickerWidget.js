import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class ButtonInput extends React.Component {

  render () {
    return (
      <a
        href="javascript:void(0);"
        className="btn btn-sm btn-secondary"
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

            let value = date;

            if(this.state.options && this.state.options.format)
              value = moment(date).format(this.state.options.format)

            this.setState(
              {value: date},
              () => this.state.onChange(value)
            );
          }}
          strictParsing
        />
      </div>
    );
  }

}


export default ReactDatePickerWidget;
