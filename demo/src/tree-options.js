const treeoptions = [{
  'value': 'parent', 
  'label': 'parent',
  'children': ['child1', 'child2'],
  'parent': null,
  'description': 'parent',
  'expanded': false,
  'depth': 0
},
{
  'value': 'child1',
  'label': 'child1',
  'children': [],
  'parent': 'parent',
  'description': 'child1',
  'expanded': false,
  'depth': 1
},
{
  'value': 'child2',
  'label': 'child2',
  'children': [],
  'parent': 'parent',
  'description': 'child1',
  'expanded': false,
  'depth': 1
}];

export default treeoptions;