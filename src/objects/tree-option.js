import _ from "lodash"

class TreeOption {
  constructor(raw, isEnd) {
    _.merge(this, raw);
    this.isEnd = isEnd;
  }

  withParent(parent) {
    this.parent = parent;
    return this;
  }

  withChildren(children) {
    this.children.push(...children);
    return this;
  }

  getParentValues(values = [this.id]) {
    if (this.parent) {
      const parentValue = this.parent.id;
      return this.parent.getParentValues([parentValue, ...values]);
    }
    return values;
  }
}

export default TreeOption;