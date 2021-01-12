import React from 'react';
import _ from 'lodash';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class ReactFormulaAgGridTable extends React.Component {
  handleRowChange = (event) => {
    const { onChange } = this.props;
    onChange && onChange(this.props.value);
  }

  cellRenderer = ({ header, ...val }) => {
    const computedValue = this.props.builder.getComputedValue(header.header, val.rowIndex);
    return computedValue;
  }

  createColumnDefs(headers) {
    const columnDefs = _.map(headers, (header) => {
      const additionalProps = header.readOnly ? {
        cellRenderer: 'cellRenderer',
        cellRendererParams: { header },
      }: {};
      return {
        field: header.header,
        editable: !!!header.readOnly,
        ...additionalProps
      };
    });
    return columnDefs;
  }

  render() {
    const columnDefs = this.createColumnDefs(this.props.headers);
    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          groupSelectsChildren={true}
          columnDefs={columnDefs}
          rowData={this.props.value}
          gridOptions={{
            onRowValueChanged: this.handleRowChange,
            components: {
              'cellRenderer': this.cellRenderer,
            },
          }}
          editType="fullRow"
        >{_.map(this.props.headers, (header) => <AgGridColumn field={header.header} />)}
        </AgGridReact>
      </div>
    )
  }
}

export default ReactFormulaAgGridTable;