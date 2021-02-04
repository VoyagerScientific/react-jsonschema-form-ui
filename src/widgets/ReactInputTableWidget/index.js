import React from "react";
import _ from "lodash";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import ReactAgGridInputTable from "./ag-grid-table";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class ReactInputTableWidget extends React.Component {
  state = {
    checkbox: true,
  };

  handleGridReady = (params) => {
    console.log("params", params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  handleCheck = (index, columnNumber) => {
    //columnNumber 1-4 respectively
    return (e) => {
      console.log(e);

      console.log(e.currentTarget.checked);
      console.log(index, columnNumber);
      // this.setState({ checkbox: !e.currentTarget.checked });
    };
  };

  isCellValueChecked = (rowData, colIndex) => {
    const { columns } = _.get(this.props, 'uiSchema.ui:options', {});
    const formData = this.props.formData;
    const selectedColumn = columns[colIndex];
    const rowValues = formData[rowData];
    return _.includes(rowValues, selectedColumn);
  }

  renderCell(colData, rowData, colIndex, rowIndex) {
    return (
      <Form.Check
        checked={this.isCellValueChecked(rowData, colIndex)}
        onChange={this.handleCheck(colIndex, 1)}
        type="radio"
        style={{ display: "flex", justifyContent: "center" }}
      />
    )
  }

  renderFooterItems() {
    return (
      <Row className="align-items-center justify-content-md-end">
        <Col sm="auto">
          <Button
            variant="link"
            size="sm"
          >Add Row</Button>
          <Button
            variant="link"
            size="sm"
          >Add Column</Button>
        </Col>
      </Row>
    );
  }


  renderTable() {
    const { rows, columns } = _.get(this.props, 'uiSchema.ui:options', {});
    return (
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            {_.map(columns, (data, index) => (
              <th key={index}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_.map(rows, (rowData, rowIndex) => (
            <tr>
              <td key={rowIndex}>{rowData}</td>
              {_.map(columns, (colData, colIndex) => (
                <td key={colIndex}>
                  {this.renderCell(colData, rowData, colIndex, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    const { title } = _.get(this.props, 'schema', {});
    return (
      <>
        <Form.Label>{title}</Form.Label>
        {this.renderTable()}
        {this.renderFooterItems()}
      </>
    );
  }
}

export default ReactInputTableWidget;
