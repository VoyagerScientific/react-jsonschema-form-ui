import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { Table, Form } from "react-bootstrap";

import _ from "lodash";

class ReactInputTableWidget extends React.Component {
  state = {
    columnDefs: [
      { headerName: "Make", field: "make" },
      { headerName: "Sell", field: "sell" },
      { headerName: "Product", field: "product" },
    ],
    checkbox: false,
    // checkboxOne: true,
    // checkboxTwo: true,
    // checkboxThree: true,
    // checkboxFour: true,
  };

  handleGridReady = (params) => {
    console.log("params", params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
  handleChange = (index) => {
    const { onChange } = this.props;

    return (e) => {
      console.log(e.currentTarget.checked);
      // onChange && onChange(rows);
      this.setState({ checkbox: e.currentTarget.checked });
    };
  };

  render() {
    const { rows, columns } = this.props.uiSchema["ui:options"];
    console.log(this.props);

    return (
      <>
        <span>sample table</span>
        <Table>
          <thead>
            <tr>
              <th></th>
              {_.map(columns, (data, index) => (
                <th key={index}>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td key={rows[0]}>{rows[0]}</td>
              {columns.map((data, index) => (
                <td key={index}>
                  <Form.Check
                    name={`${data}`}
                    checked={this.state.checkbox}
                    onChange={this.handleChange(index)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td key={rows[1]}>{rows[1]}</td>
              {columns.map((data, index) => (
                <td key={index}>
                  <Form.Check
                    name={`${data}`}
                    checked={this.state.checkbox}
                    onChange={this.handleChange(index)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td key={rows[2]}>{rows[2]}</td>
              {columns.map((data, index) => (
                <td key={index}>
                  <Form.Check
                    name={`${data}`}
                    checked={this.state.checkbox}
                    onChange={this.handleChange(index)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td key={rows[3]}>{rows[3]}</td>
              {columns.map((data, index) => (
                <td key={index}>
                  <Form.Check
                    name={`${data}`}
                    checked={this.state.checkbox}
                    onChange={this.handleChange(index)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
              ))}
            </tr>

            {/*
              //old implementation
            {_.map(rows, (data, index) => (
              <tr>
                <td key={index}>{data}</td>
                <td key={index}>
                  <Form.Check
                    name="notSatisfied"
                    checked={this.state.checkbox}
                    onChange={this.handleChange(index, 1, rows[0])}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
                <td key={index}>
                  <Form.Check
                    name="somewhatSatisfied"
                    checked={this.state.checkbox}
                    // checked={this.state.checkboxTwo}
                    onChange={this.handleChange(index, 2, rows[1])}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
                <td key={index}>
                  <Form.Check
                    name="satisfied"
                    checked={this.state.checkbox}
                    // checked={this.state.checkboxThree}
                    onChange={this.handleChange(index, 3, rows[2])}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
                <td key={index}>
                  <Form.Check
                    name="verySatisfied"
                    checked={this.state.checkbox}
                    // checked={this.state.checkboxFour}
                    onChange={this.handleChange(index, 4, rows[3])}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ReactInputTableWidget;
