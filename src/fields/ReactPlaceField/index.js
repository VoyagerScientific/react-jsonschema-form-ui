import React, { Component } from 'react';
import _ from 'lodash';
import PlacesAutocomplete from 'react-places-autocomplete';
import injectScript from 'react-inject-script';
import { InputGroup, FormControl } from 'react-bootstrap';


class ReactPlaceField extends Component {
  state = {
    googleApiLoaded: false,
    value: [],
    hasError: false,
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  async componentDidMount() {
    const googleApiKey = _.get(this.props, 'uiSchema.ui:options.api');
    if (googleApiKey) {      
      await injectScript('googleapi',`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`);
      this.setState({ googleApiLoaded: true });
    } else {
      this.setState({ hasError: 'Cannot load because of missing Google API key'});
    }
  }

  renderPlaceInput({ getInputProps, getSuggestionItemProps, suggestions, loading }) {
    return (
    <InputGroup size="sm" className="mb-3">
      <FormControl
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        {...getInputProps()}
      />      
        <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => (
          <div {...getSuggestionItemProps(suggestion)}>
            <span>{suggestion.description}</span>
          </div>
        ))}
    </div>
    </InputGroup>);
  }

  render() {
    const { schema } = this.props;
    const { googleApiLoaded, hasError } = this.state;
    return (
      <div>
        <div>{schema.title}</div>
        {googleApiLoaded && (
          <PlacesAutocomplete
            value={this.state.value}
            onChange={this.handleChange}
          >
            {(placeProps) => this.renderPlaceInput(placeProps)}
          </PlacesAutocomplete>
        )}
        {!googleApiLoaded && hasError && (
          <div className="dropzone">
            <div>{hasError}</div>
          </div>
        )}
      </div>
    );
  }
}

export default ReactPlaceField;
