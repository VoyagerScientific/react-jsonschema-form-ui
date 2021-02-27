import React from 'react';
import _ from 'lodash';
import { Table, Button } from 'react-bootstrap';

class ButtonInputTable extends React.Component {
  state = {
    checkbox: true,
  };

  handleButtonClick = (rowData, colData, currentValue) => {
    const { onChange } = this.props;
    return () => {
      const newData = { row: rowData, column: colData, value: currentValue };
      onChange && onChange(newData);
    };
  };

  isCellValueChecked = (rowData, colData, optionCellValue) => {
    const formData = this.props.formData;
    return (
      optionCellValue === formData.value &&
      rowData === formData.row &&
      colData === formData.column
    );
  };

  renderCell(rowData, colData, rowIndex, colIndex) {
    const optionValueMatrix = _.get(this.props, 'options.values', []);
    const optionCellValue = _.get(
      optionValueMatrix,
      `${rowIndex}.${colIndex}`,
      null
    );
    const isSelected = this.isCellValueChecked(
      rowData,
      colData,
      optionCellValue
    );
    return optionCellValue ? (
      <Button
        as={'span'}
        className="buttonCell"
        variant={isSelected ? 'secondary' : 'outlined'}
        active={isSelected}
        onClick={this.handleButtonClick(rowData, colData, optionCellValue)}
      >
        {optionCellValue}
      </Button>
    ) : (
      ''
    );
  }

  render() {
    const { rows, columns } = _.get(this.props, 'options', {});
    return (
      <Table responsive>
        <tbody>
          {_.map(rows, (rowData, rowIndex) => (
            <tr
              key={rowIndex}
              className={`input_table_row input_table_row-${rowIndex}`}
            >
              <td className="headerCell">
                <b>{rowData}</b>
              </td>
              {_.map(columns, (colData, colIndex) => (
                <td
                  key={colIndex}
                  className={`input_table_cell input_table_cell_${rowIndex}-${colIndex}`}
                >
                  {this.renderCell(rowData, colData, rowIndex, colIndex)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th />
            {_.map(columns, (colData, colIndex) => (
              <th key={colIndex}>{colData}</th>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ButtonInputTable;
