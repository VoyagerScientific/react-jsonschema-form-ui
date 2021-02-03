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

  render() {
    const { rows, columns } = this.props.uiSchema["ui:options"];
    console.log("rows:", rows, "column:", columns);

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
            {_.map(rows, (data, index) => (
              <tr>
                <td key={index}>{data}</td>
                <td key={index}>
                  <Form.Check
                    checked={this.state.checkbox}
                    onChange={this.handleCheck(index, 1)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
                <td key={index}>
                  <Form.Check
                    onChange={this.handleCheck(index, 2)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
                <td key={index}>
                  <Form.Check
                    onChange={this.handleCheck(index, 3)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
                <td key={index}>
                  <Form.Check
                    onChange={this.handleCheck(index, 4)}
                    type="radio"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ReactInputTableWidget;
