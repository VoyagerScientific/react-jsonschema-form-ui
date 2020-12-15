import React, { Component } from 'react';
import { IntelligentTreeSelect } from 'intelligent-tree-select';
import "intelligent-tree-select/lib/styles.css";

class ReactTreeSelectField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      width: props.uiSchema["ui:options"] && props.uiSchema["ui:options"].width || 400,
      height: props.uiSchema["ui:options"] && props.uiSchema["ui:options"].height || 150,
      value: props.formData || ""
    }
  }

  getOptionsFromValue(value, options) {
    const selectedOptions = (options || []).filter(option => {
      return (value || []).some(term => term === option.value);
    });
    return selectedOptions;
  }

  handleChange = (valueOptions) => {
    const value = valueOptions.map(option => option.value);
    this.props.onChange(value); 
  }

  componentDidMount() {
    if (!this.state.readonly && this.sigCanvas)
      this.sigCanvas.fromDataURL(this.state.formData);
  }

  render() {
    const { schema, formData } = this.props;
    const valueOptions = this.getOptionsFromValue(formData, schema.options);
    return (
      <div>
        <div>{schema.title}</div>
        <IntelligentTreeSelect
          showSettings={false}
          options={schema.options || []}
          value={valueOptions}
          onChange={this.handleChange}
          />
      </div>  
    );
  }

}

export default ReactTreeSelectField;
