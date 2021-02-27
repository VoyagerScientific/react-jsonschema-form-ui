import expect from 'expect';
import Tree from '../../src/objects/tree';

describe('src/objects/tree', () => {
  let node;

  it('Show form normal mode', () => {
    // given
    const remoteData = [
      {
        id: 1,
        url: 'https://run.mocky.io/v3/9602bc55-5152-44de-9cd6-90b06537db57',
        record: ['parents'],
        label: ['name'],
        value: ['value']
      },
      {
        id: 2,
        parent: 3,
        url: 'https://domain.com/path/${parent}',
        record: ['childs'],
        label: ['parent_name'],
        value: ['id']
      },
      {
        id: 3,
        parent: 1,
        url: 'https://domain.com/path/${parent}',
        record: ['childs'],
        label: ['parent_name'],
        value: ['id']
      }
    ];

    // when
    const tree = new Tree(remoteData);
    console.log(tree.references);

    // then
    expect(tree).toBeTruthy();
  })
});