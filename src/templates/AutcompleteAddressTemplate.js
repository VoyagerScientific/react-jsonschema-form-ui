import React from 'react';
import ReactPlaceField from '../fields/ReactPlaceField';

class AutocompleteAddressTemplate extends React.Component {
  handlePlaceSelect = async (address) => {
    console.log(address);
  }
  handleChange = (value) => {
    console.log(value);
  }

  render() {
    console.log(this.props);
    return (<>
     <ReactPlaceField
      schema={this.props.schema}
      uiSchema={this.props.uiSchema}
      onChange={this.handleChange}
      onPlaceSelect={this.handlePlaceSelect}
     />
    </>);
  }
}

export default AutocompleteAddressTemplate;