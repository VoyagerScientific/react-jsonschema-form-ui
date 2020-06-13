import React, { Component } from 'react';

class PercentWidget extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      ...props,
      value: props.value && props.value * 100
    }
  }

  _handleChange = (isBlurred) => (event) => {
    const { options, readonly, value } = this.state;
    const digits = options.digits == undefined ? 2 : options.digits;

    let newValue = event.target.value.replace(/[^0-9.]/g, "");
    if (isBlurred)
      newValue = parseFloat(newValue).toFixed(digits);

    if (!readonly) {
      this.setState({ value: newValue });
      this.state.onChange(newValue / 100);
    }
  }

  render() {
    const { readonly, value } = this.state;
    return (
      <div className="input-group">
        <input
          ref={el => this.input = el}
          className="form-control percent"
          style={{ textAlign: "right" }}
          value={value || ""}
          readOnly={readonly}
          required={this.state.required}
          onBlur={this._handleChange(true)}
          onChange={this._handleChange(false)}
        />
        <div className="input-group-append">
          <span className="input-group-text">%</span>
        </div>
      </div>
    );
  }

}

export default PercentWidget;
