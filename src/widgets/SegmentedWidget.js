import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { SegmentedControl } from 'segmented-control';
import _ from "lodash";


const SegmentedWidget = (props) => {

  let options = [];
  if(props.schema.type === "boolean"){
    options = [{
      label: "Yes",
      value: true
    },
    {
      label: "No",
      value: false,
      default: true
    }]
  }else{
    options = props.options.enumOptions.map((option)=> {
      return {
        label: option.label,
        value: option.value,
        disabled: false,
        default: true
      }
    });
    if(_.get(props, "options.includeBlank"))
      options.slice({value: null, label: null, default: true})
  }

  return (
    <div>
      <Form.Label>{props.label}</Form.Label>
      <SegmentedControl
        name={props.id}
        options={options}
        setValue={newValue => props.onChange(newValue)}
        style={{ width: "100%", color: '#3f8fe3' }} // purple400
      />
    </div>
  );
};

export default SegmentedWidget;
