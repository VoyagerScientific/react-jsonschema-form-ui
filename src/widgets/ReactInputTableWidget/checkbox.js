import React from "react";
import _ from "lodash";
import { Table, Form, Row, Col, Button } from "react-bootstrap";

class CheckboxInputTable extends React.Component {
  state = {
    checkbox: true,
  };

  handleChange = (rowData, colData, rowIndex, colIndex) => {
    return (e) => {
      const { onChange, formData } = this.props;
      let valuesInRow = _.get(formData, rowData, []);
      const isIncludedBefore = _.includes(valuesInRow, colData);

      if (isIncludedBefore) {
        valuesInRow = _.reject(valuesInRow, (value) => value === colData);
      } else {
        valuesInRow.push(colData);
      }

      const obj = { ...formData };
      obj[rowData] = valuesInRow;
      onChange && onChange(obj);
      this.forceUpdate();
    };
  };

  isCellValueChecked = (rowData, colData) => {
    const formData = this.props.formData;
    const rowValues = _.get(formData, rowData, []);
    return _.includes(rowValues, colData);
  };

  renderCell(rowData, colData, rowIndex, colIndex) {
    return (
      <Form.Check
        checked={this.isCellValueChecked(rowData, colData)}
        name={`radioGroup-${this.id}-${rowIndex}`}
        onChange={this.handleChange(rowData, colData, rowIndex, colIndex)}
        type="checkbox"
        style={{ display: "flex", justifyContent: "center" }}
      />
    );
  }

  renderTable() {
    const { rows, columns } = _.get(this.props, "options", {});
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
                  {this.renderCell(rowData, colData, rowIndex, colIndex)}
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
