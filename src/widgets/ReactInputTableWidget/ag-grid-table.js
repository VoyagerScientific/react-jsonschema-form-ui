import React from "react";
import _ from 'lodash';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class ReactAgGridInputTable extends React.Component {
  state = {
    isFormulaDisplayed: false
  };

  handleGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  handleRowChange = (event) => {
    const { onChange } = this.props;
    onChange && onChange(this.props.value);
    this.props.builder.withDataObjects(this.props.value);
    this.refreshAll();
  }

  handleCellValueChange = (event) => {
    const { onChange } = this.props;
    onChange && onChange(this.props.value);
    this.props.builder.withDataObjects(this.props.value);
    this.refreshAll();
  }

  handleDeleteRow = (event, rowIndex) => {
    const trimmedData = _.reject(this.props.value, (item, index) => index === rowIndex);
    this.props.onChange(trimmedData);
  }

  handleAddRow = () => {
    this.props.onChange([...this.props.value, {}]);
  }

  refreshAll = () => {
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params);
  };

  componentDidUpdate() {
    if (this.gridApi) {
      this.refreshAll();
    }
  }

  handleToggleDisplayFormula = (event, value) => {
    this.setState({ isFormulaDisplayed: event.target.checked });
  }

  cellRenderer = ({ header, ...val }) => {
    const computedValue = this.props.builder.getComputedValue(header.header, val.rowIndex);
    const originalValue = this.props.builder.getValue(header.header, val.rowIndex);
    const value = this.state.isFormulaDisplayed ? originalValue : computedValue;
    if (_.isObject(value)) {
      return value.value;
    }
    return value;
  }

  createColumnDefs(headers) {
    let columnDefs = _.map(headers, (header) => {
      const additionalProps = header.readOnly ? {
        cellRenderer: 'cellRenderer',
        cellRendererParams: { header },
      } : {};
      return {
        field: header.header,
        editable: !!!header.readOnly,
        ...additionalProps
      };
    });
    return [...columnDefs];
  }

  resizeColumns(params) {
    params.api.sizeColumnsToFit();
  }

  renderSwitch() {
    const { isFormulaDisplayed } = this.state;
    return (
      <Form.Check type="checkbox" label="Check me out" className="custom-control custom-switch">
        <Form.Check.Input
          onChange={this.handleToggleDisplayFormula}
          className="custom-control-input"
          type="checkbox"
          id="customSwitch1"
          checked={isFormulaDisplayed} />
        <Form.Check.Label className="custom-control-label" for="customSwitch1">Show Formula</Form.Check.Label>
      </Form.Check>
    );
  }

  renderMenuItems() {
    return (
      <Row className="align-items-center justify-content-md-end">
        <Col sm="auto">
          {this.renderSwitch()}
        </Col>
        <Col sm="auto">
          <Button
            onClick={this.handleAddRow}
            variant="link"
            size="sm"
          >Add Item</Button>
        </Col>
      </Row>
    );
  }

  render() {
    const columnDefs = this.createColumnDefs(this.props.headers);
    return (
      <Container>
        <Row>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              groupSelectsChildren={true}
              columnDefs={columnDefs}
              rowData={this.props.value}
              gridOptions={{
                onRowValueChanged: this.handleRowChange,
                onCellValueChanged: this.handleCellValueChange,
                components: {
                  'cellRenderer': this.cellRenderer,
                }
              }}
              onFirstDataRendered={this.resizeColumns}
              onGridReady={this.handleGridReady}
            >
              <AgGridColumn field="$delete" />
              {_.map(this.props.headers, (header) => <AgGridColumn field={header.header} />)}
            </AgGridReact>
          </div>
        </Row>
        {this.renderMenuItems()}
      </Container>
    )
  }
}

export default ReactAgGridInputTable;
