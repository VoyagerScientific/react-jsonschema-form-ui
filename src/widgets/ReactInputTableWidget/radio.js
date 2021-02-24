import React from "react";
import _ from "lodash";
import { Table, Form, Row, Col, Button } from "react-bootstrap";

class RadioInputTable extends React.Component {
  id = Math.floor(Math.random() * 100);

  handleCheck = (rowData, colData, rowIndex, colIndex) => {
    const { onChange, formData } = this.props;
    return (e) => {
      const obj = { ...formData };
      obj[rowData] = colData;
      onChange && onChange(obj);
    };
  };

  isCellValueChecked = (rowData, colData) => {
    const formData = this.props.formData;
    const rowValues = formData[rowData];
    return rowValues === colData;
  };

  renderCell(rowData, colData, rowIndex, colIndex) {
    return (
      <Form.Check
        checked={this.isCellValueChecked(rowData, colData)}
        name={`radioGroup-${this.id}-${rowIndex}`}
        onChange={this.handleCheck(rowData, colData, rowIndex, colIndex)}
        type="radio"
        style={{ display: "flex", justifyContent: "center" }}
      />
    );
  }

  renderTable = () => {
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
            <Form.Group as="tr" key={rowIndex}>
              <td key={rowIndex}>{rowData}</td>
              {_.map(columns, (colData, colIndex) => (
                <td key={colIndex}>
                  {this.renderCell(rowData, colData, rowIndex, colIndex)}
                </td>
              ))}
            </Form.Group>
          ))}
        </tbody>
      </Table>
    );
  };

  render() {
    return <>{this.renderTable()}</>;
  }
}

export default RadioInputTable;
