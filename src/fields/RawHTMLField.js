import React, { Component } from "react";
import { Form } from "react-bootstrap";

class RawHTMLField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      __html: props.uiSchema["ui:options"]
        ? props.uiSchema["ui:options"].html
        : "Set the html for this field with the 'ui:options' key in uiSchema.",
    };
  }

  render() {
    // const { title } = _.get(this.props, "schema", {});
    return (
      <>
        <Form.Label>{title}</Form.Label>
        <div dangerouslySetInnerHTML={this.state}></div>
      </>
    );
  }
}

export default RawHTMLField;
