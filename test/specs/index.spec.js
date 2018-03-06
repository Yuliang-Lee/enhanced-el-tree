import { createVue, destroyVM } from '../util';

describe('enhanced-el-tree', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  const getTreeVm = (props, options) => {
    return createVue(Object.assign({
      template: `
        <el-tree ref="tree" :data="data" horizontal ${ props }></el-tree>
        `,

      data() {
        return {
          defaultExpandedKeys: [],
          defaultCheckedKeys: [],
          clickedNode: null,
          count: 1,
          data: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 11,
              label: '二级 1-1',
              children: [{
                id: 111,
                label: '三级 1-1'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 21,
              label: '二级 2-1'
            }, {
              id: 22,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 31,
              label: '二级 3-1'
            }, {
              id: 32,
              label: '二级 3-2'
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      }
    }, options), true);
  };

  it('horizontal tree', () => {
    vm = getTreeVm();
    expect(document.querySelector('.el-tree')).to.exist;
    expect(document.querySelectorAll('.el-tree > .el-tree-node').length).to.equal(3);

  });
});