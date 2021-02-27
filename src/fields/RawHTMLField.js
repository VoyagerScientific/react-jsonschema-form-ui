import React, { Component } from "react";

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
    return (
      <>
        <div dangerouslySetInnerHTML={this.state}></div>
      </>
    );
  }
}

export default RawHTMLField;
