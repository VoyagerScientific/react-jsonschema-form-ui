import React, { Component } from "react";

import AsyncSelect from "react-select/async";
import AsyncCreatable from "react-select/async-creatable";
import "whatwg-fetch";

const ACTION_TYPE = {
  REMOVE: "remove-value",
  ADD: "select-option",
  CREATE: "create-option",
  CLEAR: "clear",
};

class ReactSelectWidget extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...props,
      value: Array.isArray(props.value) ? this._transformArraytoLabelsAndValues() : props.value ? { value: props.value, label: props.value } : null,
      inputValue: props.value,
      select_options: []
    }
  }

  componentDidMount() {
    const remote_options = this.props.options.remote;
    if (remote_options && remote_options.url) {
      setTimeout(() => this._setRemoteSelectOptions(), 10);
    };
  }

  componentDidMount() {
    const remote_options = this.props.options.remote;
    if (remote_options && remote_options.url) {
      setTimeout(() => this._setRemoteSelectOptions(), 10);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value && this.props.options.remote) {
      let value = this.state.value;
      if (value && Array.isArray(value)) {
        value = this._setLabelsArrayValues();
      }
      this.setState({ value: value });
    }
  }

  _setRemoteSelectOptions() {
    const remote_request = this.getRemoteData();
    const remote_options = this.props.options.remote;
    remote_request.then(response => {
      if (response.status === 200) {
        response.json().then(remoteData => {
          const record_keys = remote_options.paths && remote_options.paths.record || [];

          if (record_keys)
            record_keys.map((key, i) => { remoteData = remoteData[key] }); // This traverses the list of path names from the record array in the paths object.

          const select_options = Array.isArray(remoteData) ? remoteData.map((item, index) => {
            if (remote_options.paths) {
              let value = Object.assign({}, item);
              let label = Object.assign({}, item);
              remote_options.paths.value.map((key, i) => { value = value[key] });
              remote_options.paths.label.map((key, i) => { label = label[key] });
              return {
                value: value,
                label: label
              }

            } else {
              return item[Object.keys(remoteData)[0]]
            }
          }) : [];

          if (!select_options.length)
            console.warn(
              "ReactSelectWidget: There's no options being generated from the remote data. Check that paths were set properly. "
            );

          let value = this.state.value;
          if (value && Array.isArray(value)) {
            value = this._setLabelsArrayValues(select_options);
          } else if (value) {
            const option = select_options.find((option) => option.value === value.value);
            value = option;
          }

          this.setState({ select_options: select_options, value: value });
        });
      }
    });
  }

  _transformArraytoLabelsAndValues() {
    if (this.props.value == undefined)
      return [];
    return this.props.value.map((val, i) => { return { value: val, label: val } });
  }

  _setLabelsArrayValues(select_options = null) {
    if (!select_options)
      select_options = this.state.select_options;

    const value = this._transformArraytoLabelsAndValues();

    return value.map((obj) => {
      const option = select_options.find(({ value }) => value === obj.value)
      return {
        value: obj.value,
        label: option ? option.label : obj.value,
      };
    });
  }

  entriesDataTransform() {
    let data = [];

    if (this.props.options.remote && this.props.options.remote.url) {
      data = this.state.select_options;
    } else if (this.props.schema.enum || (this.props.schema.items && this.props.schema.items.enum)) {
      const enumValues = this.props.schema.enum || this.props.schema.items.enum;
      const enumNames = this.props.schema.enumNames;

      data = enumValues.map((item, index) => {
        let label = item;
        if (enumNames && enumValues.length === enumNames.length)
          label = enumNames[index];

        const obj = {
          value: item,
          label: label,
        };
        return obj;
      });
    }

    return data;
  }

  async getRemoteData() {
    const response = await fetch(this.state.options.remote.url, {
      method: this.state.options.remote.method || "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...this.state.options.remote.headers,
      },
    });

    return await response; // parses JSON response into native JavaScript objects
  }

  getData() {
    const data = this.entriesDataTransform();
    const filteredData = (value) =>
      data.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
    const options = (value) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(filteredData(value)), 200);
      });
    return options;
  }

  handleChange = (e, actionObject) => {
    const { onChange } = this.props;
    const isArrayType = this.props.options.isMulti || this.props.schema.type === "array";
    if (isArrayType && actionObject.action === ACTION_TYPE.REMOVE) {
      const newValueOptions = _.reject(this.state.value || [], (option) => option.value === _.get(actionObject, "removedValue.value"));
      const newValues = _.map(newValueOptions, (valueOption) => valueOption.value);
      this.setState({ value: newValueOptions });
      return onChange && onChange(newValues);
    }

    if (isArrayType && actionObject.action === ACTION_TYPE.CLEAR) {
      this.setState({ value: [] });
      return onChange && onChange([]);
    }

    if (isArrayType && actionObject.action === ACTION_TYPE.CREATE) {
      const values = _.map(e, (e) => e.value);
      this.setState({ value: e });
      return onChange && onChange(values);
    }
    
    if (isArrayType && actionObject.action === ACTION_TYPE.ADD) {
      const newValueOptions = [...this.state.value || [], actionObject.option];
      const newValues = _.map(newValueOptions, (valueOption) => valueOption.value);
      this.setState({ value: newValueOptions });
      return onChange && onChange(newValues);
    }

    if (!isArrayType && actionObject.action === ACTION_TYPE.CLEAR) {
      this.setState({ value: null });
      return onChange && onChange(null);
    }
    
    onChange && onChange(e.value);
    this.setState({ value: e });
  }

  render() {
    const { isClearable, isSearchable, isCreateable } = this.props.options;
    const isMulti = this.props.options.isMulti || this.props.schema.type === "array" || false;
    const isList = _.get(this.props, "options.isList", false);
    if (isCreateable) {
      return (
        <div>
          <AsyncCreatable
            classNamePrefix="react-select"
            className={isList ? "is-list" : ""}
            selectProps={{
              className: isList ? "is-list-input" : ""
            }}
            cacheOptions
            defaultOptions={this.state.select_options.length ? this.state.select_options : true}
            loadOptions={this.getData()}
            onChange={this.handleChange}
            isClearable={isClearable}
            isMulti={isMulti}
            isSearchable={isSearchable}
            value={this.state.value}
            isDisabled={this.state.disabled || this.state.readonly}
          />
          <input
            name={this.props.id}
            id={this.props.id}
            style={{ position: "absolute", border: 0, width: 1, height: 1 }}
            type="text"
            onChange={(event) => { return this.state.value }}
            required={this.props.required}
            value={this.state.value || ""}
          />
        </div>
      )
    } else {
      return (
        <div>
          <AsyncSelect
            classNamePrefix="react-select"
            className={isList ? "is-list" : ""}
            cacheOptions
            selectProps={{
              className: isList ? "is-list-input" : ""
            }}
            defaultOptions={this.state.select_options.length ? this.state.select_options : true}
            loadOptions={this.getData()}
            onChange={this.handleChange}
            isClearable={isClearable}
            isMulti={isMulti}
            isSearchable={isSearchable}
            value={this.state.value}
            isDisabled={this.state.disabled || this.state.readonly}
          />
          <input
            name={this.props.id}
            id={this.props.id}
            style={{ position: "absolute", border: 0, width: 1, height: 1 }}
            type="text"
            onChange={(event) => { return this.state.value }}
            required={this.props.required}
            value={this.state.value || ""}
          />
        </div>
      )
    }
  }
}

export default ReactSelectWidget;
