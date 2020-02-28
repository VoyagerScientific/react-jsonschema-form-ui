import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';

class ReactSelectWidget extends Component {

  constructor(props){
    super(props)
    this.state = {
      ...props,
      value: {value: props.value, label: props.value},
      inputValue: props.value
    }
  }

  entriesDataTransform() {
    let data = [];
    const enumValues = this.props.schema.enum || this.props.schema.items.enum;
    const enumNames = this.props.schema.enumNames;
    if (enumNames && enumValues.length === enumNames.length) {
      data = enumValues.map((item, index) => {
        const obj = {
          value: item,
          label: enumNames[index]
        }
        return obj
      })
    }else{
      data = enumValues.map((item, index) => {
        const obj = {
          value: item,
          label: item
        }
        return obj
      })
    }
    return data
  }

  getData() {
    const data = this.entriesDataTransform()
    const filteredData = value => data.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
    const options = value => new Promise(resolve => {
      setTimeout(() => resolve(filteredData(value)), 200);
    });
    return options
  }

  onChange = e => {
    if(!e)
      return false;

    let value = undefined;
    if (e && (this.props.options.isMulti || this.props.schema.type === "array")) {
      value = Array.from(e, item => item.value);
      this.props.onChange(value)
    } else if (e) {
      value = e.value
      this.props.onChange(value);
    }
    this.setState({value: e}); // The value always needs to be in this format: {value: value, label: label}
    return true
  }

  render() {
    const { isClearable, isSearchable, isCreateable } = this.props.options;
    const isMulti = this.props.options.isMulti || this.props.schema.type === "array" || false;
    if (isCreateable) {
      return <AsyncCreatable
                cacheOptions
                defaultOptions
                loadOptions={this.getData()}
                onChange={this.onChange}
                isClearable={isClearable}
                isMulti={isMulti}
                isSearchable={isSearchable}
                value={this.state.value}
              />
    }else{
      return <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={this.getData()}
                onChange={this.onChange}
                isClearable={isClearable}
                isMulti={isMulti}
                isSearchable={isSearchable}
                value={this.state.value}
              />
    }
  }
}

export default ReactSelectWidget;
