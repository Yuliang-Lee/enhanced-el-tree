<template>
  <div
    class="el-tree"
    :class="{ 'el-tree--highlight-current': highlightCurrent }"
    role="tree"
  >
    <div v-if="horizontal" :class="[treeNodeWrapperClass, 'el-tree-node-wrapper']">
      <div class="el-tree-node-block">
        <el-tree-node
          v-for="child in root.childNodes"
          :node="child"
          :props="props"
          :render-after-expand="renderAfterExpand"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          @node-expand="handleNodeExpand"/>
      </div>
      <div v-for="level in store.levelShow" :key="level.id" class="el-tree-node-block">
        <el-tree-node
          v-for="child in level.childNodes"
          :node="child"
          :props="props"
          :render-after-expand="renderAfterExpand"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          @node-expand="handleNodeExpand"/>
      </div>
    </div>
    <template v-if="!horizontal">
      <el-tree-node
        v-for="child in root.childNodes"
        :node="child"
        :props="props"
        :render-after-expand="renderAfterExpand"
        :key="getNodeKey(child)"
        :render-content="renderContent"
        @node-expand="handleNodeExpand"/>
    </template>
    <div class="el-tree__empty-block" v-if="!root.childNodes || root.childNodes.length === 0">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
import TreeStore from './model/tree-store';
import ElTreeNode from './tree-node.vue';
import { t } from 'element-ui/src/locale';
import emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElTree',

  components: {
    ElTreeNode
  },

  mixins: [emitter],

  props: {
    data: {
      type: Array
    },
    emptyText: {
      type: String,
      default() {
        return t('el.tree.emptyText');
      }
    },
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    nodeKey: String,
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    checkDescendants: {
      type: Boolean,
      default: false
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          icon: 'icon',
          disabled: 'disabled'
        };
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 18
    },
    horizontal: Boolean,
    treeNodeWrapperClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: []
    };
  },

  computed: {
    children: {
      set(value) {
        this.data = value;
      },
      get() {
        return this.data;
      }
    },
    treeItemArray() {
      return Array.prototype.slice.call(this.treeItems);
    },
    /**
     * 获取 tree 组件底层的节点数据结构
     *
     * @return {Array[Node]}
     */
    __nodes() {
      const nodes = [];
      const nodesMap = this.store.nodesMap;
      for (const nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey)) {
          nodes.push(nodesMap[nodeKey]);
        }
      }

      return nodes;
    }
  },

  watch: {
    defaultCheckedKeys(newVal) {
      this.store.defaultCheckedKeys = newVal;
      this.store.setDefaultCheckedKey(newVal);
    },
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    data(newVal) {
      this.store.setData(newVal);
    },
    checkboxItems(val) {
      Array.prototype.forEach.call(val, (checkbox) => {
        checkbox.setAttribute('tabindex', -1);
      });
    }
  },


  created() {
    this.isTree = true;

    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      horizontal: this.horizontal,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod
    });

    this.root = this.store.root;
  },
  mounted() {
    this.initTabindex();
    this.$el.addEventListener('keydown', this.handelKeydown);
  },
  updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]');
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
  },

  methods: {
    filter(value) {
      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
    },
    getNodeKey(node, index) {
      const nodeKey = this.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return index;
    },
    getNodePath(data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
      const node = this.store.getNode(data);
      if (!node) return [];
      const path = [node.data];
      let parent = node.parent;
      while (parent && parent !== this.root) {
        path.push(parent.data);
        parent = parent.parent;
      }
      return path.reverse();
    },
    getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    },
    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    getCurrentNode() {
      const currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
      const currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
      this.store.setUserCurrentNode(node);
    },
    setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
      this.store.setCurrentNodeKey(key);
    },
    handleNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.$emit('node-expand', nodeData, node, instance);
    },
    updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    },
    initTabindex() {
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
      const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0);
        return;
      }
      this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
    },
    handelKeydown(ev) {
      const currentItem = ev.target;
      if (currentItem.className.indexOf('el-tree-node') === -1) return;
      ev.preventDefault();
      const keyCode = ev.keyCode;
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      const currentIndex = this.treeItemArray.indexOf(currentItem);
      let nextIndex;
      if ([38, 40].indexOf(keyCode) > -1) { // up、down
        if (keyCode === 38) { // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else {
          nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0;
        }
        this.treeItemArray[nextIndex].focus(); // 选中
      }
      const hasInput = currentItem.querySelector('[type="checkbox"]');
      if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
        currentItem.click(); // 选中
      }
      if ([13, 32].indexOf(keyCode) > -1) { // space enter选中checkbox
        if (hasInput) {
          hasInput.click();
        }
      }
    },

    /**
     * 获取所有 checked 和 indeterminate 状态的节点 key
     */
    getAllCheckedKeys() {
      const keys = [];
      const nodesMap = this.store.nodesMap;
      for (const nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey) && (nodesMap[nodeKey].indeterminate || nodesMap[nodeKey].checked)) {
          keys.push(nodesMap[nodeKey].data[this.store.key]);
        }
      }

      return keys;
    },

    /**
     * 获取所有 checked 和 indeterminate 状态的节点 node
     */
    getAllCheckedNodes() {
      const nodes = [];
      const nodesMap = this.store.nodesMap;
      for (const nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey) && (nodesMap[nodeKey].indeterminate || nodesMap[nodeKey].checked)) {
          nodes.push(nodesMap[nodeKey].data);
        }
      }

      return nodes;
    },

    /**
     * 通过节点数据设置选中状态，不会因为选中父节点而把所有子节点都选中
     *
     * @param {Object} nodeArray 节点数据数组
     */
    setCheckedNodesPrecisely(nodeArray) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodesPrecisely');

      const leafIds = this.__nodes.filter(node => node.isLeaf).map(node => node.data[this.nodeKey]);
      const leafNodes = nodeArray.filter(n => leafIds.includes(n[this.nodeKey]));

      // 调用原生方法
      this.setCheckedNodes(leafNodes);
    },

    /**
     * 通过节点 nodeKey 设置选中状态，不会因为选中父节点而把所有子节点都选中
     *
     * @param {String} keyArray 节点 nodeKey 数组
     */
    setCheckedKeysPrecisely(keyArray) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodesPrecisely');

      const leafIds = this.__nodes.filter(node => node.isLeaf).map(node => node.data[this.nodeKey]);
      const leafs = keyArray.filter(n => leafIds.includes(n));

      // 调用原生方法
      this.setCheckedKeys(leafs);
    },

    /**
     * 获取尽量低层的【选中】的节点
     *
     * @example
     *  level1 - intermediate
     *    level1.1 - checked
     *      level1.1.1 - checked
     *      level1.1.2 - checked
     *    level1.2 - checked
     *    level1.3 - intermediate
     *      level1.3.1 - checked
     *      level1.3.2 - not checked
     *    level1.4 - not checked
     *  level2 - checked
     *
     *  getCheckedKeysWithoutChild() will return [level2, level1.1, level1.2, level1.3.1]
     */
    getCheckedKeysWithoutChild() {
      return this.__nodes.filter(node => {
        return node.checked && !node.parent.checked;
      }).map(node => node.data[this.nodeKey]);
    },

    /**
     * 获取尽量低层的【选中】的节点
     * 和 getCheckedKeysWithoutChild 方法一样，但是返回 node 对象
     *
     */
    getCheckedNodesWithoutChild() {
      return this.__nodes.filter(node => {
        return node.checked && !node.parent.checked;
      }).map(node => node.data);
    }
  }
};
</script>

<style lang="scss">
.el-tree {
  .el-tree-node-wrapper {
    display: flex;
    overflow-x: auto;

    .el-tree-node-block {
      flex-grow: 1;
      min-width: 190px;
      max-height: 200px;
      overflow-y: auto;
      border-right: 1px solid #f0f2f5;
      transition: all .3s;

      &:nth-last-child(1) {
        border-right: none;
      }
    }

    .el-tree-node__content {
      padding-left: 0 !important;
      margin-left: -12px;
      position: relative;
    }
    .el-tree-node__expand-icon {
      visibility: hidden;

      &.right-icon {
        position: absolute;
        right: 10px;
        visibility: visible;
      }
    }
  }
}
</style>
