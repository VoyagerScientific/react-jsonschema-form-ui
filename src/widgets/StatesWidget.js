import React, { Component } from 'react';
import { us_states } from '../helpers/us_states';

class StatesWidget extends Component {

  handleChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  renderStateOptions() {
    const state_abbreviations = Object.keys(us_states);
    return state_abbreviations.map((state) => {
      return (
        <option key={state} value={state}>{state}</option>
      );
    });
  }

  render() {
    const { id, value, required, readonly } = this.props;
    return (
      <React.Fragment>
        <select id={id}
          className="form-control"
          value={value}
          required={required}
          onChange={this.handleChange}
          readOnly={readonly}
          disabled={readonly}
        >
          <option value=""> </option>
          {this.renderStateOptions()}
        </select>
      </React.Fragment>
    );
  }
}

StatesWidget.defaultProps = {
  readonly: true,
};

export default StatesWidget;
