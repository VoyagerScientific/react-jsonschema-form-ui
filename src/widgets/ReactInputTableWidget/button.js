import React from "react";
import _ from "lodash";
import { Table, Button } from "react-bootstrap";

class ButtonInputTable extends React.Component {
  state = {
    checkbox: true,
  };

  handleButtonClick = (currentValue) => {
    const { onChange } = this.props;
    return () => {
      onChange && onChange(currentValue);
    };
  };

  isCellValueChecked = (optionCellValue) => {
    const formData = this.props.formData;
    return optionCellValue === formData;
  };

  renderCell(rowData, colData, rowIndex, colIndex) {
    const { formData } = this.props;
    const optionValueMatrix = _.get(this.props, 'uiSchema.ui:options.values', []);
    const optionCellValue = _.get(optionValueMatrix, `${rowIndex}.${colIndex}`, null);
    const isSelected = this.isCellValueChecked(optionCellValue);
    return  optionCellValue ? (
      <Button
        fullWidth
        variant={isSelected ? "secondary" : "outlined"}
        active={isSelected}
        onClick={this.handleButtonClick(optionCellValue)}
      >
        {optionCellValue}
      </Button>
    ) : "";
  }

  render() {
    const { rows, columns } = _.get(this.props, "uiSchema.ui:options", {});
    return (
      <Table responsive>
        <tbody>
          {_.map(rows, (rowData, rowIndex) => (
            <tr key={rowIndex}>
              <td><b>{rowData}</b></td>
              {_.map(columns, (colData, colIndex) => (
                <td key={colIndex}>
                  {this.renderCell(rowData, colData, rowIndex, colIndex)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th />
            {_.map(columns, (colData, colIndex) => (
              <th key={colIndex}>
                {colData}
              </th>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ButtonInputTable;
