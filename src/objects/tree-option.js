import _ from 'lodash'

class TreeOption {
  constructor(raw) {
    _.merge(this, raw);
  }

  withParent(parent) {
    this.parent = parent;
    return this;
  }

  withChildren(children) {
    this.children.push(...children);
    return this;
  }

  getParentValues(values = [this.value]) {
    if (this.parent) {
      const parentValue = this.parent.value;
      return this.parent.getParentValues([...values, parentValue]);
    }
    return values;
  }
}

export default TreeOption;