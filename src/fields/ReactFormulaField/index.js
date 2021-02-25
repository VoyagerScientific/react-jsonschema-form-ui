import React from "react";
import _ from "lodash";
import HyperFormulaBuilder from "./../../components/hyperformula/builder";
import ReactFormulaAgGridTable from "./ag-grid-table";
import { Button, Col, Row, Container } from "react-bootstrap";

class ReactFormulaField extends React.Component {
  constructor(props) {
    super(props);
    this.builder = new HyperFormulaBuilder();
    this.state = {
      headers: [],
    };
  }

  componentDidMount() {
    const headers = this.getHeaders(this.props);
    this.builder.withHeaders(headers);
    this.setState({ headers });
  }

  getHeaders() {
    const properties = _.get(this.props, "schema.items.properties", {});
    const headers = _.toPairs(properties);
    return _.map(headers, ([headerKey, headerObject]) => {
      let header = { header: headerKey, ...headerObject };
      if (header.readOnly) {
        const formula = _.get(
          this.props,
          `uiSchema.ui:options.formulas.${headerKey}`,
          ""
        );
        header.formula = formula;
      }
      return header;
    });
  }

  handleChange = (values) => {
    const { onChange } = this.props;
    onChange && onChange(values);
  };

  render() {
    this.builder.withDataObjects(this.props.formData);
    const label = _.get(this.props, "schema.title", "");
    return (
      <div>
        <Row>
          <Col>{label}</Col>
        </Row>
        <Row>
          <Col>
            {this.builder && (
              <ReactFormulaAgGridTable
                builder={this.builder}
                headers={this.state.headers}
                value={this.props.formData}
                onChange={this.handleChange}
                confirmRemove={
                  this.props.uiSchema["ui:options"].confirmRemove || false
                }
                removable={
                  this.props.uiSchema["ui:options"].removable === undefined
                    ? true
                    : this.props.uiSchema["ui:options"].removable
                }
                height={this.props.uiSchema["ui:options"].height}
                width={this.props.uiSchema["ui:options"].width}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReactFormulaField;
