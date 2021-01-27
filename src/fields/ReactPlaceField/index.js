import React, { Component } from "react";
import _ from "lodash";
import PlacesAutocomplete from "react-places-autocomplete";
import injectScript from "react-inject-script";
import { InputGroup, FormControl, FormLabel } from "react-bootstrap";
import classNames from "classnames";

class ReactPlaceField extends Component {
  state = {
    googleApiLoaded: false,
    value: [],
    hasError: false,
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange && onChange(value);
  };

  handleSelect = (value, placeId, placeObject) => {
    const { onPlaceSelect } = this.props;
    this.setState({ value });
    onPlaceSelect && onPlaceSelect(placeObject);
  };

  async componentDidMount() {
    const googleApiKey = _.get(this.props, "uiSchema.ui:options.api");
    if (googleApiKey) {
      await injectScript(
        "googleapi",
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`
      );
      this.setState({ googleApiLoaded: true });
    } else {
      this.setState({
        hasError: "Cannot load because of missing Google API key",
      });
    }
  }

  renderPlaceInput({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) {
    return (
      <>
        <InputGroup className="mb-3">
          <FormControl
            {...getInputProps()}
          />{" "}
          {!_.isEmpty(suggestions) && (
            <div className="autocomplete-dropdown-container">
              <div className="wrapper">
                {loading && <div className="loading">Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div className={classNames({
                    "suggestion": true,
                    "active": suggestion.active })} {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}          
        </InputGroup>
      </>
    );
  }

  render() {
    const { schema } = this.props;
    const { googleApiLoaded, hasError } = this.state;
    return (
      <div>
        <FormLabel>{schema.title}</FormLabel>
        {googleApiLoaded && (
          <PlacesAutocomplete
            value={this.state.value}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
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
