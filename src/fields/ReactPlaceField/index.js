import React, { Component } from "react";
import _ from "lodash";
import PlacesAutocomplete from "react-places-autocomplete";
import injectScript from "react-inject-script";
import {
  InputGroup,
  FormControl,
  FormLabel,
  Spinner,
  Card,
} from "react-bootstrap";
import classNames from "classnames";

class ReactPlaceField extends Component {
  static defaultProps = { options: "sample options props" };

  state = {
    googleApiLoaded: false,
    loading: true,
    value: "",
    hasError: false,
    id: Math.floor(Math.random() * 100),
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange && onChange(value);
  };

  handleSelect = (value, placeId, placeObject) => {
    const { onPlaceSelect, onChange } = this.props;
    this.setState({ value });
    placeObject && onChange && onChange(placeObject.description);
    onPlaceSelect && onPlaceSelect(placeObject);
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const googleApiKey = _.get(this.props, "uiSchema.ui:options.api");
      if (googleApiKey) {
        await injectScript(
          "googleapi",
          `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`
        );
        setTimeout(() => {
          this.setState({ googleApiLoaded: true, loading: false });
        }, 2000);
      } else {
        throw Error("No Google API Key");
      }
    } catch (error) {
      this.setState({
        hasError: "Cannot load because of missing Google API key",
        loading: false,
      });
    }
  }
  componentDidUpdate() {}

  renderPlaceInput({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) {
    return (
      <>
        <InputGroup className="mb-3">
          <FormControl {...getInputProps()} />{" "}
          {!_.isEmpty(suggestions) && (
            <div className="autocomplete-dropdown-container">
              <div className="wrapper">
                {loading && <div className="loading">Loading...</div>}
                {suggestions.map((suggestion, index) => (
                  <div
                    className={classNames({
                      suggestion: true,
                      active: suggestion.active,
                    })}
                    {...getSuggestionItemProps(suggestion)}
                    key={`${this.state.id}-${index}`}
                  >
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

  renderLoading() {
    return (
      <Card className="text-center">
        <Card.Body>
          <Spinner animation="border" size="sm" role="status" /> Loading...
        </Card.Body>
      </Card>
    );
  }

  render() {
    const { schema } = this.props;
    const { googleApiLoaded, hasError, loading } = this.state;
    console.log("ReactPlaceField:", this.props);
    return (
      <div>
        <FormLabel>{schema.title}</FormLabel>
        {loading && this.renderLoading()}
        {!loading && googleApiLoaded && (
          <PlacesAutocomplete
            value={this.state.value}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {(placeProps) => this.renderPlaceInput(placeProps)}
          </PlacesAutocomplete>
        )}
        {!loading && !googleApiLoaded && hasError && (
          <div className="dropzone">
            <div>{hasError}</div>
          </div>
        )}
      </div>
    );
  }
}

export default ReactPlaceField;
