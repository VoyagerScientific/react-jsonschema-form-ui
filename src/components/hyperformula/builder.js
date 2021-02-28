import HyperFormula from "hyperformula";

function toColumnName(num) {
  for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
  }
  return ret;
}

class HyperFormulaBuilder {
  constructor() {
    this.hyperformula = HyperFormula.buildEmpty({
      precisionRounding: 10,
      licenseKey: "agpl-v3"
    });
    this.mainSheetName = this.hyperformula.addSheet("main");
  }

  withHeaders(headers) {
    const headerKeys = _.map(headers, (header) => header.header);
    this.headers = headers;
    this.hyperformula.setCellContents({ row: 0, col: 0, sheet: 0 }, [headerKeys]);
  }

  get sheetId() {
    return this.hyperformula.getSheetId(this.mainSheetName);
  }

  getConvertedValues() {
    return this.hyperformula.getSheetValues(this.sheetId);
  }


  getComputedValue(headerName, rowIndex) {
    const indexOfHeader = _.findIndex(this.headers, (header) => header.header === headerName);
    return this.hyperformula.getCellValue({ col: indexOfHeader, row: rowIndex + 0, sheet: this.sheetId });
  }

  getValue(headerName, rowIndex) {
    const indexOfHeader = _.findIndex(this.headers, (header) => header.header === headerName);
    return this.hyperformula.getCellFormula({ col: indexOfHeader, row: rowIndex + 0, sheet: this.sheetId });
  }

  getRow(obj, index) {
    const values = _.map(this.headers, (header) => {
      if (header.readOnly) {
        return _.replace(`=${header.formula}`, new RegExp("\\[i\\]","g"), index);
      }
      return _.get(obj, header.header);
    });
    return values;
  }

  getRows(dataObjects) {
    const rows = _.map(dataObjects, (obj, index) => this.getRow(obj, index + 1));
    return rows;
  }

  withDataObjects(dataObjects) {
    this.rows = this.getRows(dataObjects);
    this.hyperformula.setCellContents({ row: 0, col: 0, sheet: 0 }, this.rows);
    return this;
  }
}

export default HyperFormulaBuilder;