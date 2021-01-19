import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
  closeButton: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
  }
};

class ReactPlaceAutocompleteField extends Component {

  handleChange = (codeValue) => {
    console.log(codeValue);
    this.props.onChange(codeValue);
    this.setState({ showScanner: false, value: codeValue });
  }

  render() {
    return (
          <span>
sadasdsda
          </span>
    );
  }
}

export default ReactPlaceAutocompleteField;
