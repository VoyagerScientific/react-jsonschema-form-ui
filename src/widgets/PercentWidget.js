import React, { Component } from "react";
import { Form } from "react-bootstrap";

class PercentWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      value: props.value && props.value * 100,
    };
  }

  _handleChange(event) {
    const digits =
      this.state.options.digits == undefined ? 2 : this.state.options.digits;

    let value = event.target.value.replace(/[^0-9.]/g, "");
    if (event.type === "blur" && event.target.value)
      value = parseFloat(value).toFixed(digits);
    this.setState({ value: value });
    this.state.onChange(value / 100);
  }

  render() {
    const { title } = _.get(this.props, "schema", {});
    return (
      <>
        <Form.Label>{title}</Form.Label>
        <div className="input-group">
          <input
            type="text"
            id={this.props.id}
            className="form-control percent"
            style={{ textAlign: "right" }}
            value={this.state.value}
            required={this.state.required}
            onBlur={(event) => {
              this._handleChange(event);
            }}
            onChange={(event) => {
              this._handleChange(event);
            }}
            disabled={this.state.disabled}
            readOnly={this.state.readonly}
          />
          <div className="input-group-append">
            <span className="input-group-text">%</span>
          </div>
        </div>
      </>
    );
  }
}

export default PercentWidget;
