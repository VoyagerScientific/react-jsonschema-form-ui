import _ from 'lodash';
import axios from 'axios';
import MustacheHelper from '../helpers/mustache';
import TreeOption from './tree-option';

class Tree {
  constructor(remoteData, ref) {
    this.references = this.getSortedRemoteData(remoteData);
    this.options = [];
    this.ref = ref;
  }

  getSortedRemoteData(datas) {
    return datas.sort((left, right) => _.get(left, 'parent') - _.get(right, 'parent'));
  }

  async getChildOptions(option) {
    if (!_.isEmpty(this.references) && !option) {
      const levelZeroOption = this.references[0];
      const response = await axios.get(levelZeroOption.url);
      const responseData = response.data;
      const options = await this.getOptionsFromResponseData(levelZeroOption, responseData, option);
      if (option) {
        option.children = _.map(options, (o) => o.value);
      }
      const treeOptions = _.map(options, (o) => new TreeOption(o));
      this.options.push(...treeOptions);
      return options;
    }

    if (!_.isEmpty(this.references) && option) {
      const parentOption = option;
      const parentValue = parentOption.value;
      const parentTreeOption = _.find(this.options, (o) => o.value === parentValue);

      if (!parentTreeOption) {
        option.children = [];
        return [];
      }

      const selectedReference = this.references[parentOption.depth + 1];
      const parentValues = parentTreeOption.getParentValues();
      const derivedUrl = MustacheHelper.getCompiledText(selectedReference.url, { parent: parentValues });
      const options = await this.getDerivedOptions(derivedUrl, selectedReference, parentOption);

      if (parentOption) {
        parentOption.children = _.map(options, (o) => o.value);
      }

      const treeOptions = _.map(options, (o) => new TreeOption(o));
      this.options.push(...treeOptions);
      return options;
    }
    return [];
  }

  isParentInLastDepth(parentOption) {
    if (!parentOption) {
      return false;
    }

    const maxDepth = this.references.length - 1;
    return _.get(parentOption, 'depth', 0) + 1 >= maxDepth;
  }

  async getDerivedOptions(derivedUrl, selectedReference, selectedOption) {
    try {
      const response = await axios.get(derivedUrl);
      const responseData = response.data;
      const options = this.getOptionsFromResponseData(selectedReference, responseData, selectedOption);
      return options;
    } catch (error) {
      return [];
    }
  }

  getDerivedUrl(url, parentValue) {
    const derivedUrl = _.replace(url, ':id', parentValue);
    return derivedUrl
  }

  getOptionsFromResponseData(selectedReference, responseData, parent) {
    const records = _.get(responseData, selectedReference.record.join('.'), []);
    const isParentInLastDepth = this.isParentInLastDepth(parent);
    return _.map(records, (record) => {
      const label = _.get(record, selectedReference.label.join('.'));
      const value = _.get(record, selectedReference.value.join('.'));
      return {
        label,
        value: value,
        children: isParentInLastDepth ? [] : [""],
        parent: parent ? parent.value : null,
        depth: parent ? parent.depth + 1 : 0,
      };
    });
  }
}

export default Tree;