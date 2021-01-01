import React, { Component } from 'react';
import { IntelligentTreeSelect } from 'intelligent-tree-select';
import axios from 'axios';
import _ from 'lodash';
import "intelligent-tree-select/lib/styles.css";
import Tree from '../objects/tree';

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
    const remoteOptions = _.get(props, 'uiSchema.ui:options.remote.data') || [];
    this.tree = new Tree(remoteOptions, this.select);
  }

  handleFetchChildren = async (args) => {
    return this.tree.getChildOptions(args.option);
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
    const isMulti = _.get(this.props, 'uiSchema.ui:options.isMulti', false);
    if (!isMulti) {
      const value = _.get(valueOptions, 'value');
      this.props.onChange(value ? [value] : []);
    } else {
      const value = valueOptions.map(option => option.value);
      this.props.onChange(value);
    }
  }

  render() {
    const { schema, formData } = this.props;
    const isMulti = _.get(this.props, 'uiSchema.ui:options.isMulti', false);
    const isCreateable = _.get(this.props, 'uiSchema.ui:options.isCreateable', false);
    const valueOptions = this.getOptionsFromValue(formData, schema.options);
    return (
      <div>
        <div>{schema.title}</div>
        <IntelligentTreeSelect
          ref={select => {
            this.select.current = select;
          }}
          showSettings={isCreateable}
          multi={isMulti}
          options={schema.options || []}
          value={isMulti ? valueOptions : _.get(valueOptions, '0')}
          fetchOptions={this.handleFetchChildren}
          onChange={this.handleChange}
        />
      </div>
    );
  }

}

export default ReactTreeSelectField;