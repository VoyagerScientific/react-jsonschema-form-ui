import React from "react";
import _ from "lodash";
import { Form, Row, Col, Button } from "react-bootstrap";
import ButtonInputTable from "./button";
import CheckboxInputTable from "./checkbox";
import RadioInputTable from "./radio";
import { CHECKBOX, RADIO } from "./constants";

class ReactInputTableWidget extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const options = _.merge(props.uiSchema["ui:options"], props.options);
    return {
      options: { ...options },
      checkbox: true,
    };
  }
  state = {

  };

  renderFooterItems() {
    return (
      <Row className="align-items-center justify-content-md-end">
        <Col sm="auto">
          <Button variant="link" size="sm">
            Add Row
          </Button>
          <Button variant="link" size="sm">
            Add Column
          </Button>
        </Col>
      </Row>
    );
  }

  renderTable() {
    const { inputTableType } = _.get(this.state, "options", {});
    switch (inputTableType) {
      case CHECKBOX:
        return (
          <CheckboxInputTable {...this.props} options={this.state.options} />
        );
      case RADIO:
        return <RadioInputTable {...this.props} options={this.state.options} />;
      default:
        return (
          <ButtonInputTable {...this.props} options={this.state.options} />
        );
    }
  }

  render() {
    const { title } = _.get(this.props, "schema", {});
    const { headerModifiable, columnModifiable } = _.get(
      this.state,
      "options",
      {}
    );

    console.log("ReactInputTableWidget state:", this.state);
    return (
      <>
        <Form.Label>{title}</Form.Label>
        {this.renderTable()}
        {headerModifiable && columnModifiable && this.renderFooterItems()}
      </>
    );
  }
}

ReactInputTableWidget.defaultProps = {
  options: {},
};

export default ReactInputTableWidget;
