import React from 'react';
import _ from 'lodash';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import ReactPlaceField from '../fields/ReactPlaceField';
import { Card, Form, Row } from 'react-bootstrap';

const DEFAULT_FIELDS = {
  address_1: 'address_1',
  address_2: 'address_2',
  city: 'city',
  state: 'state',
  postal_code: 'postal_code',
  country: 'country',
};

class AutocompleteAddressTemplate extends React.Component {
  get formProps() {
    return _.get(this.props.formContext, 'form.current', null);
  }

  get fieldNames() {
    const newValues = _.get(this.props, 'uiSchema.ui:options.fields', {});
    return _.merge(DEFAULT_FIELDS, newValues);
  }

  handleFieldChange = (key, fieldName) => (value) => {
    const formData = this.formProps.state.formData;
    _.set(formData, fieldName, event.target.value);
    this.formProps.onChange && this.formProps.onChange(formData);
  }

  handlePlaceSelect = async (address) => {
    const fieldNames = this.fieldNames;
    const oldFormData = _.get(this, 'formProps.state.formData', this.props.formData);
    if (!address) {
      const newFormData = {
        ...oldFormData,
        [fieldNames.address_1]: null,
        [fieldNames.address_2]: null,
        [fieldNames.postal_code]: null,
        [fieldNames.state]: null,
        [fieldNames.city]: null,
        [fieldNames.country]: null,
      };
      this.formProps && this.formProps.setState(newFormData);
      this.formProps && this.formProps.onChange(newFormData);
      return;
    }

    const [geocode] = await geocodeByPlaceId(address.placeId);
    const firstAddress = this.getFieldByGeoCode(geocode, ["street_number", "route", "neighborhood"]);
    const secondAddress = this.getFieldByGeoCode(geocode, ["sublocality", "administrative_area_level_3", "administrative_area_level_2"]);
    const city = this.getFieldByGeoCode(geocode, "locality");
    const state = this.getFieldByGeoCode(geocode, "administrative_area_level_1");
    const country = this.getFieldByGeoCode(geocode, "country");
    const postalCode = this.getFieldByGeoCode(geocode, "postal_code");
    const newFormData = {
      ...oldFormData,
      [fieldNames.address_1]: firstAddress,
      [fieldNames.address_2]: secondAddress,
      [fieldNames.postal_code]: postalCode,
      [fieldNames.state]: state,
      [fieldNames.city]: city,
      [fieldNames.country]: country,
    };
    this.formProps && this.formProps.setState(newFormData);
    this.formProps && this.formProps.onChange(newFormData);
    this.forceUpdate();
  }

  handleChange = (value) => {
    console.log(value);
    this.props.onChange && this.props.onChange(value);
  }

  getFieldByGeoCode(geocode, placeType) {
    const addressComponents = geocode.address_components;
    if (_.isArray(placeType)) {
      const placeTerms = _.map(placeType, (type) => this.getAddressComponentByType(addressComponents, type));
      return _.compact(placeTerms).join(', ');
    }

    const selectedComponent = _.find(addressComponents, (component) => _.includes(component.types, placeType));
    return selectedComponent && selectedComponent.long_name;
  }

  getAddressComponentByType(addressComponents, placeType) {
    const selectedComponent = _.find(addressComponents, (component) => _.includes(component.types, placeType));
    return selectedComponent && selectedComponent.long_name;
  }

  render() {
    const showFormFields = _.get( this.props, 'uiSchema.ui:options.showFormFields', false);
    return (<>
      <ReactPlaceField
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        onChange={this.handleChange}
        onPlaceSelect={this.handlePlaceSelect}
      />
      { showFormFields && (
        <Card>
          <Card.Body>
            {this.renderFormFields()}
          </Card.Body>
        </Card>
      )}
    </>);
  }

  renderFormFields() {
    const oldFormData = _.get(this, 'formProps.state.formData', this.props.formData);
    return _.map(this.fieldNames, (fieldName, key) => (
      <Row className="p-4">
        <Form.Label>{_.chain(fieldName).split('_').map(_.capitalize).join(' ').value()}</Form.Label>
        <Form.Control value={oldFormData[fieldName]} onChange={this.handleFieldChange(key, fieldName)} />
      </Row>
    ));
  }
}

export default AutocompleteAddressTemplate;