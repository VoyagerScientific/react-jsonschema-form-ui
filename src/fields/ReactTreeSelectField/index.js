import React, { Component } from "react";
import { IntelligentTreeSelect } from "intelligent-tree-select";
import _ from "lodash";
import "intelligent-tree-select/lib/styles.css";
import Tree from "../../objects/tree";
import ReactTreeSelectFieldOption from "./option";

class ReactTreeSelectField extends Component {
  constructor(props) {
    super(props);
    this.select = React.createRef();
    this.state = {
      ...props,
      width:
        (props.uiSchema["ui:options"] && props.uiSchema["ui:options"].width) ||
        400,
      height:
        (props.uiSchema["ui:options"] && props.uiSchema["ui:options"].height) ||
        150,
      value: props.formData || "",
    };
    const remoteOptions = _.get(props, "uiSchema.ui:options.remote.data") || [];
    this.tree = new Tree(remoteOptions, this.select);
  }

  handleFetchChildren = async (args) => {
    return this.tree.getChildOptions(args.option);
  };

  getOptionsFromValue(value) {
    const currentSelect = this.select.current;
    if (currentSelect) {
      const options = currentSelect.state.options;
      const selectedOptions = (options || []).filter((option) => {
        return (value || []).some((term) => term === option.value);
      });
      return selectedOptions;
    }
  }

  handleChange = (valueOptions, ...args) => {
    const isMulti = _.get(this.props, "uiSchema.ui:options.isMulti", false);
    if (!isMulti) {
      const value = _.get(valueOptions, "value");
      this.props.onChange(value ? [value] : []);
    } else {
      const value = valueOptions.map((option) => option.value);
      this.props.onChange(value);
    }
  };

  handleInputChange = (...args) => {};

  isRemote() {
    const remoteOptions =
      _.get(this.props, "uiSchema.ui:options.remote.data") || [];
    return remoteOptions.length > 0;
  }

  getSchemaOptions() {
    const { uiSchema } = this.props;
    if (this.isRemote()) {
      return _.get(uiSchema["ui:options"], "treeOptions");
    } else {
      return _.map(_.get(uiSchema["ui:options"], "treeOptions"), (opt) => {
        if (opt.children.length === 0) {
          opt.isEnd = true;
        }
        return opt;
      });
    }
  }

  render() {
    const { schema, formData } = this.props;
    const isMulti = _.get(this.props, "uiSchema.ui:options.isMulti", false);
    const isCreateable = _.get(
      this.props,
      "uiSchema.ui:options.isCreateable",
      false
    );
    const schemaOptions = this.getSchemaOptions();
    const valueOptions = this.getOptionsFromValue(formData, schemaOptions);
    return (
      <div>
        <div>{schema.title}</div>
        <IntelligentTreeSelect
          optionRenderer={(optionProps) => (
            <ReactTreeSelectFieldOption {...optionProps} select={this.select} />
          )}
          ref={(select) => {
            this.select.current = select;
          }}
          showSettings={isCreateable}
          multi={isMulti}
          options={schemaOptions || []}
          value={isMulti ? valueOptions : _.get(valueOptions, "0")}
          fetchOptions={this.handleFetchChildren}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default ReactTreeSelectField;
