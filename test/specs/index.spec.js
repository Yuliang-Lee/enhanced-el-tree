import { createVue, destroyVM } from '../util';

describe('enhanced-el-tree', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  const getTreeVm = (props, options) => {
    return createVue(Object.assign({
      template: `
        <enhanced-el-tree ref="tree" node-key="id" :data="data" horizontal ${ props }></enhanced-el-tree>
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
              label: '二级 2-2',
              children: [
                {
                  id: 221,
                  label: '二级 2-1-1'
                }
              ]
            },
            {
              id: 23,
              label: '二级 2-3'
            }
          ]
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
    expect(document.querySelector('.el-tree > .el-tree-node-wrapper')).to.exist;
    expect(document.querySelectorAll('.el-tree .el-tree-node-block > .el-tree-node').length).to.equal(3);
  });

  it('new functions', () => {
    vm = getTreeVm();
    const checked = [1, 11, 111, 2, 21, 22, 221, 32];
    vm.$refs.tree.setCheckedKeysPrecisely(checked);
    vm.$nextTick(_ => {
      expect(vm.$refs.tree.getNode(2).indeterminate).to.true;
      expect(vm.$refs.tree.getNode(22).checked).to.true;
      expect(vm.$refs.tree.getAllCheckedKeys().sort().join() === checked.sort().join()).to.true;
      expect(vm.$refs.tree.getCheckedKeysWithoutChild().sort().join() === [1, 21, 22, 32].sort().join()).to.true;
    })
  });
});