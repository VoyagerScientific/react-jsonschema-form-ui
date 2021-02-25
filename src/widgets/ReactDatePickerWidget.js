import React, { Component } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class ButtonInput extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    let value = this.props.value;
    if (value && this.props.displayFormat)
      value = moment(this.props.value).format(this.props.displayFormat);
    return (
      <a
        className="btn btn-sm btn-secondary"
        href={"#!"}
        onClick={this.handleClick}
      >
        {value || <span className="d-print-none">Choose Date</span>}
      </a>
    );
  }
}

ButtonInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

class ReactDatePickerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };

    this.dataFormat = null;
    this.displayFormat = "MM/DD/YYYY";

    if (this.state.options && this.state.options.format) {
      if (
        typeof this.state.options.format === "object" &&
        this.state.options.format !== null
      ) {
        this.dataFormat = this.state.options.format.data;
        this.displayFormat = this.state.options.format.display;
      } else {
        this.dataFormat = this.state.options.format;
        this.displayFormat = this.state.options.format;
      }
    }
  }

  render() {
    const { title } = _.get(this.props, "schema", {});
    let selected = null;
    if (this.state.value)
      selected = moment(this.state.value, this.dataFormat).toDate();
 

    return (
      <>
        <Form.Label>{title}</Form.Label>
        <div style={{ display: "block" }}>
          <DatePicker
            customInput={<ButtonInput displayFormat={this.displayFormat} />}
            selected={selected}
            required={this.state.required}
            onChange={(date) => {
              let value = date;

              if (this.dataFormat) value = moment(date).format(this.dataFormat);

              this.setState({ value: date }, () => this.state.onChange(value));
            }}
            strictParsing
            disabled={this.state.disabled}
            readOnly={this.state.readonly}
            isClearable
          />
          <input
            name={this.props.id}
            id={this.props.id}
            style={{ position: "absolute", border: 0, width: 1, height: 1 }}
            type="text"
            onChange={(event) => {
              return this.state.value;
            }}
            required={this.props.required}
            value={this.state.value || ""}
          />
        </div>
      </>
    );
  }
}

export default ReactDatePickerWidget;
