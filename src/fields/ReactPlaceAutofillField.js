import React from 'react';
import _ from 'lodash';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import ReactPlaceField from './ReactPlaceField';
import { Card, Form, Row } from 'react-bootstrap';

const DEFAULT_FIELDS = {
  address_1: 'address_1',
  address_2: 'address_2',
  city: 'city',
  state: 'state',
  postal_code: 'postal_code',
  country: 'country',
  latitude: 'latitude',
  longitude: 'longitude',
};

class ReactPlaceAutofillField extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const options = _.merge(props.uiSchema['ui:options'], props.options);
    return {
      options: { ...options },
      id: Math.floor(Math.random() * 100),
    };
  }

  state = {};

  get formProps() {
    return _.get(this.props.formContext, 'form.current', null);
  }

  get fieldNames() {
    const newValues = _.get(this.state, 'options.fields', {});
    return _.merge(DEFAULT_FIELDS, newValues);
  }

  handleFieldChange = (key, fieldName) => (event) => {
    const propsName = this.props.name;
    const addressData = this.props.formData;
    _.set(addressData, fieldName, event.target.value);
    this.props.onChange && this.props.onChange(addressData);
    this.forceUpdate();
  };

  handlePlaceSelect = async (address) => {
    const fieldNames = this.fieldNames;
    const oldFormData = _.get(
      this,
      'formProps.state.formData',
      this.props.formData
    );
    if (!address) {
      const newFormData = {
        ...oldFormData,
        [fieldNames.address_1]: null,
        [fieldNames.address_2]: null,
        [fieldNames.postal_code]: null,
        [fieldNames.state]: null,
        [fieldNames.latitude]: null,
        [fieldNames.longitude]: null,
      };
      this.formProps && this.formProps.setState(newFormData);
      this.formProps && this.formProps.onChange(newFormData);
      return;
    }

    const [geocode] = await geocodeByPlaceId(address.placeId);
    const firstAddress = this.getFieldByGeoCode(geocode, [
      'street_number',
      'route',
      'neighborhood',
    ]);
    const city = this.getFieldByGeoCode(geocode, 'locality');
    const state = this.getFieldByGeoCode(
      geocode,
      'administrative_area_level_1'
    );
    const country = this.getFieldByGeoCode(geocode, 'country');
    const postalCode = this.getFieldByGeoCode(geocode, 'postal_code');
    const { lat, lng } = this.getFieldLocation(geocode);
    const addressData = {
      [fieldNames.address_1]: firstAddress,
      [fieldNames.address_2]: null,
      [fieldNames.postal_code]: postalCode,
      [fieldNames.state]: state,
      [fieldNames.city]: city,
      [fieldNames.country]: country,
      [fieldNames.latitude]: lat,
      [fieldNames.longitude]: lng,
    };

    const updateAdjacentFields =
      _.get(this.state, 'options.updateAdjacentFields') || false;
    if (updateAdjacentFields) {
      this.formProps &&
        this.formProps.onChange({ ...oldFormData, ...addressData });
    }

    this.props.onChange(addressData);
    this.forceUpdate();
  };

  handleChange = (value) => {
    console.log(value);
    this.props.onChange && this.props.onChange(value);
  };

  getFieldByGeoCode(geocode, placeType) {
    const addressComponents = geocode.address_components;
    if (_.isArray(placeType)) {
      const placeTerms = _.map(placeType, (type) =>
        this.getAddressComponentByType(addressComponents, type)
      );
      return _.compact(placeTerms).join(', ');
    }

    const selectedComponent = _.find(addressComponents, (component) =>
      _.includes(component.types, placeType)
    );
    return selectedComponent && selectedComponent.long_name;
  }

  getAddressComponentByType(addressComponents, placeType) {
    const selectedComponent = _.find(addressComponents, (component) =>
      _.includes(component.types, placeType)
    );
    return selectedComponent && selectedComponent.long_name;
  }

  getFieldLocation(geocode) {
    const geocodeLocation = geocode.geometry.location;
    const lat = geocodeLocation.lat();
    const lng = geocodeLocation.lng();
    return { lat, lng };
  }

  render() {
    const showFields = _.get(this.state, 'options.showFields', false);
    console.log('ReactPlaceAutofillField:', this.props);
    return (
      <>
        <ReactPlaceField
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          onChange={this.handleChange}
          onPlaceSelect={this.handlePlaceSelect}
        />
        {showFields && (
          <Card key={'a'}>
            <Card.Body>{this.renderFormFields()}</Card.Body>
          </Card>
        )}
      </>
    );
  }

  renderFormFields() {
    const propsValue = this.props.formData;
    return _.map(this.fieldNames, (fieldName, key) => (
      <Row className="p-4" key={`form-${this.state.id}-${key}`}>
        <Form.Label>
          {_.chain(fieldName).split('_').map(_.capitalize).join(' ').value()}
        </Form.Label>
        <Form.Control
          value={propsValue[fieldName] || ''}
          onChange={this.handleFieldChange(key, fieldName)}
        />
      </Row>
    ));
  }
}

ReactPlaceAutofillField.defaultProps = {
  options: {},
};

export default ReactPlaceAutofillField;
