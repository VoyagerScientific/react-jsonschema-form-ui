import React from 'react';
import { FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import ReactPlaceField from '../fields/ReactPlaceField';

class AutocompleteAddressTemplate extends React.Component {

  state = {
    city: null,
  };

  handlePlaceSelect = async (address) => {
    const city = this.getTermFromPlaceType(address, "political");
    this.props.formData.city = city;
    this.setState({ city });
  }
  handleChange = (value) => {
    console.log(value);
  }

  renderShowFormFields() {
    return (<>
      <FormGroup>
        <FormLabel>City</FormLabel>
        <FormControl value={this.props.formData.city} />
      </FormGroup>
    </>);
  }

  getTermFromPlaceType(place, placeType) {
    const typeIndex = _.findIndex(place.types, (type) => type === placeType);
    const term = _.get(place, `terms.${typeIndex}.value`);
    return term;
  }

  render() {
    console.log(this.props);
    const showFormFields = true;
    return (<>
      <ReactPlaceField
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        onChange={this.handleChange}
        onPlaceSelect={this.handlePlaceSelect}
      />
      { showFormFields && this.renderShowFormFields()}
    </>);
  }
}

export default AutocompleteAddressTemplate;