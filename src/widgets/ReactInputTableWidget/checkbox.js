import React from "react";
import _ from "lodash";
import { Table, Form, Row, Col, Button } from "react-bootstrap";

class CheckboxInputTable extends React.Component {
  state = {
    checkbox: true,
  };

  handlefeedbackSelector = (columnIndex) => {
    switch (columnIndex) {
      case 0:
        return ["Not Satisfied"];
      case 1:
        return ["Somewhat Satisfied"];
      case 2:
        return ["Satisfied"];
      case 3:
        return ["Very Satisfied"];
      default:
        return [""];
    }
  };

  handleCheck = (rowData, rowIndex, colIndex) => {
    const { onChange, formData } = this.props;
    return (e) => {
      const obj = { ...formData };
      obj[rowData] = this.handlefeedbackSelector(colIndex);
      onChange && onChange(obj);
    };
  };

  isCellValueChecked = (rowData, colIndex) => {
    const { columns } = _.get(this.props, "uiSchema.ui:options", {});
    const formData = this.props.formData;
    const selectedColumn = columns[colIndex];
    const rowValues = formData[rowData];
    return _.includes(rowValues, selectedColumn);
  };

  renderCell(rowData, rowIndex, colIndex) {
    return (
      <Form.Check
        checked={this.isCellValueChecked(rowData, colIndex)}
        name={`radioGroup-${this.id}-${rowIndex}`}
        onChange={this.handleCheck(rowData, rowIndex, colIndex)}
        type="checkbox"
        style={{ display: "flex", justifyContent: "center" }}
      />
    );
  }

 

  renderTable() {
    const { rows, columns } = _.get(this.props, "uiSchema.ui:options", {});
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
            <tr key={rowIndex}>
              <td key={rowIndex}>{rowData}</td>
              {_.map(columns, (colData, colIndex) => (
                <td key={colIndex}>
                  {this.renderCell(rowData, rowIndex, colIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return <>{this.renderTable()}</>;
  }
}

export default CheckboxInputTable;
