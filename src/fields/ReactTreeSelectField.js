import React, { Component } from 'react';
import { IntelligentTreeSelect } from 'intelligent-tree-select';
import axios from 'axios';
import _ from 'lodash';
import "intelligent-tree-select/lib/styles.css";

class ReactTreeSelectField extends Component {

  constructor(props) {
    super(props);
    this.select = React.createRef();
    this.state = {
      ...props,
      width: props.uiSchema["ui:options"] && props.uiSchema["ui:options"].width || 400,
      height: props.uiSchema["ui:options"] && props.uiSchema["ui:options"].height || 150,
      value: props.formData || ""
    }
  }

  handleFetchChildren = async (args) => {
    const remoteOptions = _.get(this.props, 'uiSchema.ui:options.remote.data') || [];
    if (!_.isEmpty(remoteOptions)) {
      const levelZeroOption = remoteOptions[0];
      const response = await axios.get(levelZeroOption.url);
      const responseData = response.data;
      const options = this.getOptionsFromResponseData(levelZeroOption, responseData, args.option);
      if (args.option) {
        args.option.children = _.map(options, (o) => o.value);
      }
      return options;
    }
    return [];
  }

  getOptionsFromResponseData(option, responseData, parent) {
    const records = _.get(responseData, option.record.join('.'), []);
    return _.map(records, (record) => {
      const label = _.get(record, option.label.join('.'));
      const value = _.get(record, option.value.join('.'));
      return {
        label,
        value: `${parent ? parent.value : 0}-${value}`,
        children: [""],
        parent: parent ? parent.value : null,
        depth: parent ? parent.depth + 1 : 0,
      };
    });
  }

  getOptionsFromValue(value) {
    const currentSelect = this.select.current;
    if (currentSelect) {
      const options = currentSelect.state.options;
      const selectedOptions = (options || []).filter(option => {
        return (value || []).some(term => term === option.value);
      });
      return selectedOptions;
    }
  }

  handleChange = (valueOptions) => {
    const value = valueOptions.map(option => option.value);
    this.props.onChange(value);
  }

  render() {
    const { schema, formData } = this.props;
    const valueOptions = this.getOptionsFromValue(formData, schema.options);
    return (
      <div>
        <div>{schema.title}</div>
        <IntelligentTreeSelect
          ref={select => {
            this.select.current = select;
          }}
          showSettings={false}
          options={schema.options || []}
          value={valueOptions}
          fetchOptions={this.handleFetchChildren}
          onChange={this.handleChange}
        />
      </div>
    );
  }

}

export default ReactTreeSelectField;