import React, { Component } from 'react';
import { withStyles } from 'react-jss';

const DEFAULT_HTML = "Set the html for this field with the 'ui:options' key in uiSchema.";

const styles = {
  widget: {
    padding: '5px',
  }
};

class RawHTMLField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const html = props.uiSchema["ui:options"] ? props.uiSchema["ui:options"].html : DEFAULT_HTML;
    return { ...state, __html: props.formData || html };
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  }

  render() {
    const { classes, readonly } = this.props;
    return (<div
      className={classes.widget}
      contentEditable={!readonly ? "true" : "false"}
      onBlur={this.handleChange}
      // onFocus={this.handleChange}
      dangerouslySetInnerHTML={this.state}>
    </div>);
  }
}

const StyledRawHTMLField = withStyles(styles)(RawHTMLField);

export default class extends Component {
  render() {
    return (<StyledRawHTMLField {... this.props} />);
  }
};