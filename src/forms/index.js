import _ from "lodash";
import React from "react";
// import Form from "@rjsf/core";
import Form from "@rjsf/bootstrap-4";
import CodeReader from "./../fields/ReactScannerField/scanner";

class SchemaForm extends React.Component {
  form = React.createRef();

  render() {
    const formContext = { ...(this.props.formContext || {}) };
    return (
      <Form
        ref={(form) => {
          this.form.current = form;
        }}
        {...this.props}
        formContext={{ ...formContext, form: this.form }}
      />
    );
  }

  renderForm(props) {
    return <div>HI</div>;
  }
}

export default SchemaForm;
