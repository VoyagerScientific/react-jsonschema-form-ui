import React from 'react';
import _ from 'lodash';
import { HotTable } from '@handsontable/react';
import HyperFormulaBuilder from './../../components/hyperformula/builder';

class ReactFormulaField extends React.Component {
  constructor(props) {
    super(props);
    this.builder = new HyperFormulaBuilder();
  }
  
  componentDidMount() {
    const headers = this.getHeaders(this.props);
    this.builder.withHeaders(headers);
    this.setState({ headers });
  }

  handleChange = (change, source) => {
    if (source === "edit") {
      const [row, column, old, newValue] = change[0];
      const currentHeader = this.state.headers[column];
      const currentValue = this.props.formData[row];
      currentValue[currentHeader.header] = newValue;
      this.props.onChange(this.props.formData);
    }
  }

  getHeaders(props) {
    const properties = _.get(this.props, 'schema.items.properties', {});
    const headers = _.toPairs(properties);
    return _.map(headers, ([headerKey, headerObject]) => {
      let header = { header: headerKey, ...headerObject };
      if (header.readOnly) {
        const formula = _.get(this.props, `uiSchema.ui:options.formulas.${headerKey}`, '');
        header.formula = formula;
      }
      return header;
    });
  }

  render() {
    this.builder.withDataObjects(this.props.formData);
    const convertedData =  this.builder && this.builder.getConvertedValues() || this.data;
    return (
      <div id="hot-app">
        { this.builder && (
          <HotTable settings={
            {
              data: this.builder.rows,
              colHeaders: true,
              rowHeaders: true,
              contextMenu: true,
              formulas: true,
              afterChange: this.handleChange,
            }
          } width="600" height="300" />
        )}
      </div>
    );
  }
}

export default ReactFormulaField;