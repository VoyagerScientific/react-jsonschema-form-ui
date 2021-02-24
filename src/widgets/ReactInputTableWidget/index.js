import React from "react";
import _ from "lodash";
import { Form, Row, Col, Button } from "react-bootstrap";
import ButtonInputTable from "./button";
import CheckboxInputTable from "./checkbox";
import RadioInputTable from "./radio";
import { CHECKBOX, RADIO } from "./constants";

class ReactInputTableWidget extends React.Component {
  state = {
    checkbox: true,
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
    const { inputTableType } = _.get(this.props, "uiSchema.ui:options", {});
    switch (inputTableType) {
      case CHECKBOX:
        return <CheckboxInputTable {...this.props} />;
      case RADIO:
        return <RadioInputTable {...this.props} />;
      default:
        return <ButtonInputTable {...this.props} />;
    }
  }

  render() {
    const { title } = _.get(this.props, "schema", {});
    const { headerModifiable, columnModifiable } = _.get(
      this.props,
      "uiSchema.ui:options",
      {}
    );
    return (
      <>
        <Form.Label>{title}</Form.Label>
        {this.renderTable()}
        {headerModifiable && columnModifiable && this.renderFooterItems()}
      </>
    );
  }
}

export default ReactInputTableWidget;
