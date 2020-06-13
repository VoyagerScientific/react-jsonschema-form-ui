export const isComponentInput = (node) => {
  return node.type === 'input';
};

export const isComponentOfType = (node, ReactComponent) => {
  return node.instance instanceof ReactComponent;
};