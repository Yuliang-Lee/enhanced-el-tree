(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["EnhancedElTree"] = factory(require("vue"));
	else
		root["EnhancedElTree"] = factory(root["vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_tree_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_node_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_src_locale__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_src_mixins_emitter__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElTree',

  components: {
    ElTreeNode: __WEBPACK_IMPORTED_MODULE_1__tree_node_vue__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_3_element_ui_src_mixins_emitter__["a" /* default */]],

  props: {
    data: {
      type: Array
    },
    emptyText: {
      type: String,
      default: function _default() {
        return Object(__WEBPACK_IMPORTED_MODULE_2_element_ui_src_locale__["a" /* t */])('el.tree.emptyText');
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
      default: function _default() {
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

  data: function data() {
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
      set: function set(value) {
        this.data = value;
      },
      get: function get() {
        return this.data;
      }
    },
    treeItemArray: function treeItemArray() {
      return Array.prototype.slice.call(this.treeItems);
    },

    /**
     * 获取 tree 组件底层的节点数据结构
     *
     * @return {Array[Node]}
     */
    __nodes: function __nodes() {
      var nodes = [];
      var nodesMap = this.store.nodesMap;
      for (var nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey)) {
          nodes.push(nodesMap[nodeKey]);
        }
      }

      return nodes;
    }
  },

  watch: {
    defaultCheckedKeys: function defaultCheckedKeys(newVal) {
      this.store.defaultCheckedKeys = newVal;
      this.store.setDefaultCheckedKey(newVal);
    },
    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    data: function data(newVal) {
      this.store.setData(newVal);
    },
    checkboxItems: function checkboxItems(val) {
      Array.prototype.forEach.call(val, function (checkbox) {
        checkbox.setAttribute('tabindex', -1);
      });
    }
  },

  created: function created() {
    this.isTree = true;

    this.store = new __WEBPACK_IMPORTED_MODULE_0__model_tree_store__["a" /* default */]({
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
  mounted: function mounted() {
    this.initTabindex();
    this.$el.addEventListener('keydown', this.handelKeydown);
  },
  updated: function updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]');
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
  },


  methods: {
    filter: function filter(value) {
      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
    },
    getNodeKey: function getNodeKey(node, index) {
      var nodeKey = this.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return index;
    },
    getNodePath: function getNodePath(data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
      var node = this.store.getNode(data);
      if (!node) return [];
      var path = [node.data];
      var parent = node.parent;
      while (parent && parent !== this.root) {
        path.push(parent.data);
        parent = parent.parent;
      }
      return path.reverse();
    },
    getCheckedNodes: function getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    },
    getCheckedKeys: function getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    getCurrentNode: function getCurrentNode() {
      var currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey: function getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
      var currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked: function setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    setCurrentNode: function setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
      this.store.setUserCurrentNode(node);
    },
    setCurrentKey: function setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
      this.store.setCurrentNodeKey(key);
    },
    handleNodeExpand: function handleNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.$emit('node-expand', nodeData, node, instance);
    },
    updateKeyChildren: function updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    },
    initTabindex: function initTabindex() {
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
      var checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0);
        return;
      }
      this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
    },
    handelKeydown: function handelKeydown(ev) {
      var currentItem = ev.target;
      if (currentItem.className.indexOf('el-tree-node') === -1) return;
      ev.preventDefault();
      var keyCode = ev.keyCode;
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      var currentIndex = this.treeItemArray.indexOf(currentItem);
      var nextIndex = void 0;
      if ([38, 40].indexOf(keyCode) > -1) {
        // up、down
        if (keyCode === 38) {
          // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else {
          nextIndex = currentIndex < this.treeItemArray.length - 1 ? currentIndex + 1 : 0;
        }
        this.treeItemArray[nextIndex].focus(); // 选中
      }
      var hasInput = currentItem.querySelector('[type="checkbox"]');
      if ([37, 39].indexOf(keyCode) > -1) {
        // left、right 展开
        currentItem.click(); // 选中
      }
      if ([13, 32].indexOf(keyCode) > -1) {
        // space enter选中checkbox
        if (hasInput) {
          hasInput.click();
        }
      }
    },


    /**
     * 获取所有 checked 和 indeterminate 状态的节点 key
     */
    getAllCheckedKeys: function getAllCheckedKeys() {
      var keys = [];
      var nodesMap = this.store.nodesMap;
      for (var nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey) && (nodesMap[nodeKey].indeterminate || nodesMap[nodeKey].checked)) {
          keys.push(nodesMap[nodeKey].data[this.store.key]);
        }
      }

      return keys;
    },


    /**
     * 获取所有 checked 和 indeterminate 状态的节点 node
     */
    getAllCheckedNodes: function getAllCheckedNodes() {
      var nodes = [];
      var nodesMap = this.store.nodesMap;
      for (var nodeKey in nodesMap) {
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
    setCheckedNodesPrecisely: function setCheckedNodesPrecisely(nodeArray) {
      var _this = this;

      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodesPrecisely');

      var leafIds = this.__nodes.filter(function (node) {
        return node.isLeaf;
      }).map(function (node) {
        return node.data[_this.nodeKey];
      });
      var leafNodes = nodeArray.filter(function (n) {
        return leafIds.includes(n[_this.nodeKey]);
      });

      // 调用原生方法
      this.setCheckedNodes(leafNodes);
    },


    /**
     * 通过节点 nodeKey 设置选中状态，不会因为选中父节点而把所有子节点都选中
     *
     * @param {String} keyArray 节点 nodeKey 数组
     */
    setCheckedKeysPrecisely: function setCheckedKeysPrecisely(keyArray) {
      var _this2 = this;

      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodesPrecisely');

      var leafIds = this.__nodes.filter(function (node) {
        return node.isLeaf;
      }).map(function (node) {
        return node.data[_this2.nodeKey];
      });
      var leafs = keyArray.filter(function (n) {
        return leafIds.includes(n);
      });

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
    getCheckedKeysWithoutChild: function getCheckedKeysWithoutChild() {
      var _this3 = this;

      return this.__nodes.filter(function (node) {
        return node.checked && !node.parent.checked;
      }).map(function (node) {
        return node.data[_this3.nodeKey];
      });
    },


    /**
     * 获取尽量低层的【选中】的节点
     * 和 getCheckedKeysWithoutChild 方法一样，但是返回 node 对象
     *
     */
    getCheckedNodesWithoutChild: function getCheckedNodesWithoutChild() {
      return this.__nodes.filter(function (node) {
        return node.checked && !node.parent.checked;
      }).map(function (node) {
        return node.data;
      });
    }
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NODE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return markNodeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getNodeKey; });
var NODE_KEY = '$treeNodeId';

var markNodeData = function markNodeData(node, data) {
  if (data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

var getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_transitions_collapse_transition__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_packages_checkbox__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_src_mixins_emitter__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElTreeNode',

  componentName: 'ElTreeNode',

  components: {
    ElCollapseTransition: __WEBPACK_IMPORTED_MODULE_0_element_ui_src_transitions_collapse_transition__["a" /* default */],
    ElCheckbox: __WEBPACK_IMPORTED_MODULE_1_element_ui_packages_checkbox__["a" /* default */],
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        var node = this.node;
        var data = node.data;
        var store = node.store;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, { _self: parent.tree.$vnode.context, node: node, data: data, store: store }) : h(
          'span',
          { 'class': 'el-tree-node__label' },
          [this.node.label]
        );
      }
    }
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2_element_ui_src_mixins_emitter__["a" /* default */]],

  props: {
    node: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    props: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      showCheckbox: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },


  watch: {
    'node.indeterminate': function nodeIndeterminate(val) {
      this.handleSelectChange(this.node.checked, val);
    },

    'node.checked': function nodeChecked(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },

    'node.expanded': function nodeExpanded(val) {
      var _this = this;

      this.$nextTick(function () {
        return _this.expanded = val;
      });
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },

  created: function created() {
    var _this2 = this;

    var parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
    var tree = this.tree;
    if (!tree) {
      console.warn('Can not find node\'s tree.');
    }

    var props = tree.props || {};
    var childrenKey = props.children || 'children';

    this.$watch('node.data.' + childrenKey, function () {
      _this2.node.updateChildren();
    });

    this.showCheckbox = tree.showCheckbox;

    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', function (node) {
        if (_this2.node !== node) {
          _this2.node.collapse();
        }
      });
    }
  },


  methods: {
    getNodeKey: function getNodeKey(node, index) {
      var nodeKey = this.tree.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return index;
    },
    handleSelectChange: function handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },
    handleClick: function handleClick() {
      var store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
      this.tree.currentNode = this;
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
      this.tree.$emit('node-click', this.node.data, this.node, this);
    },
    handleExpandIconClick: function handleExpandIconClick() {
      var store = this.tree.store;
      if (this.node.isLeaf) return;
      if (this.expanded) {
        store.levelShow.splice(this.node.level - 1, store.levelShow.length);
        this.tree.$emit('node-collapse', this.node.data, this.node, this);
        this.node.collapse();
      } else {
        store.levelShow.splice(this.node.level - 1, store.levelShow.length, this.node);
        this.node.expand();
        this.$emit('node-expand', this.node.data, this.node, this);
      }
    },
    handleCheckChange: function handleCheckChange(value, ev) {
      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
    },
    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.tree.$emit('node-expand', nodeData, node, instance);
    }
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_mixins_emitter__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElCheckbox',

  mixins: [__WEBPACK_IMPORTED_MODULE_0_element_ui_src_mixins_emitter__["a" /* default */]],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  componentName: 'ElCheckbox',

  data: function data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },


  computed: {
    model: {
      get: function get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);

          this.isLimitExceeded === false && this.dispatch('ElCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked: function isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ElCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store: function store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled: function isDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled : this.disabled || (this.elForm || {}).disabled;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxSize: function checkboxSize() {
      var temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },

  methods: {
    addToStore: function addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange: function handleChange(ev) {
      var _this = this;

      if (this.isLimitExceeded) return;
      var value = void 0;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(function () {
        if (_this.isGroup) {
          _this.dispatch('ElCheckboxGroup', 'change', [_this._checkboxGroup.value]);
        }
      });
    }
  },

  created: function created() {
    this.checked && this.addToStore();
  },
  mounted: function mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree__ = __webpack_require__(8);


function install(Vue) {
  Vue.component('EnhancedlElTree', __WEBPACK_IMPORTED_MODULE_0__tree__["a" /* default */]);
}

// module.exports = {
//   install,
//   EnhancedElTree
// };

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__tree__["a" /* default */]);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tree_vue__ = __webpack_require__(2);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e17f1412_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tree_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(9)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tree_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e17f1412_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tree_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e17f1412_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tree_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/tree.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e17f1412", Component.options)
  } else {
    hotAPI.reload("data-v-e17f1412", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(12).default
var update = add("4197f62a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":true}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e17f1412\",\"scoped\":false,\"sourceMap\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tree.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":true}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e17f1412\",\"scoped\":false,\"sourceMap\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(true);
// imports


// module
exports.push([module.i, "\n.el-tree .el-tree-node-wrapper {\n  display: flex;\n  overflow-x: auto;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node-block {\n    flex-grow: 1;\n    min-width: 190px;\n    max-height: 200px;\n    overflow-y: auto;\n    border-right: 1px solid #f0f2f5;\n    transition: all .3s;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node-block:nth-last-child(1) {\n      border-right: none;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node__content {\n    padding-left: 0 !important;\n    margin-left: -12px;\n    position: relative;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node__expand-icon {\n    visibility: hidden;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node__expand-icon.right-icon {\n      position: absolute;\n      right: 10px;\n      visibility: visible;\n}\n", "", {"version":3,"sources":["/Users/franklee/github/enhanced-el-tree/src/tree.vue"],"names":[],"mappings":";AACA;EACE,cAAc;EACd,iBAAiB;CAClB;AACD;IACI,aAAa;IACb,iBAAiB;IACjB,kBAAkB;IAClB,iBAAiB;IACjB,gCAAgC;IAChC,oBAAoB;CACvB;AACD;MACM,mBAAmB;CACxB;AACD;IACI,2BAA2B;IAC3B,mBAAmB;IACnB,mBAAmB;CACtB;AACD;IACI,mBAAmB;CACtB;AACD;MACM,mBAAmB;MACnB,YAAY;MACZ,oBAAoB;CACzB","file":"tree.vue","sourcesContent":["\n.el-tree .el-tree-node-wrapper {\n  display: flex;\n  overflow-x: auto;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node-block {\n    flex-grow: 1;\n    min-width: 190px;\n    max-height: 200px;\n    overflow-y: auto;\n    border-right: 1px solid #f0f2f5;\n    transition: all .3s;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node-block:nth-last-child(1) {\n      border-right: none;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node__content {\n    padding-left: 0 !important;\n    margin-left: -12px;\n    position: relative;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node__expand-icon {\n    visibility: hidden;\n}\n.el-tree .el-tree-node-wrapper .el-tree-node__expand-icon.right-icon {\n      position: absolute;\n      right: 10px;\n      visibility: visible;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(13);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var TreeStore = function () {
  function TreeStore(options) {
    var _this = this;

    _classCallCheck(this, TreeStore);

    this.currentNode = null;
    this.currentNodeKey = null;

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.nodesMap = {};
    this.levelShow = [];

    this.root = new __WEBPACK_IMPORTED_MODULE_0__node__["a" /* default */]({
      data: this.data,
      store: this
    });

    if (this.lazy && this.load) {
      var loadFn = this.load;
      loadFn(this.root, function (data) {
        _this.root.doCreateChildren(data);
        _this._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }

  _createClass(TreeStore, [{
    key: 'filter',
    value: function filter(value) {
      var filterNodeMethod = this.filterNodeMethod;
      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;

        childNodes.forEach(function (child) {
          child.visible = filterNodeMethod.call(child, value, child.data, child);

          traverse(child);
        });

        if (!node.visible && childNodes.length) {
          var allHidden = true;

          childNodes.forEach(function (child) {
            if (child.visible) allHidden = false;
          });

          if (node.root) {
            node.root.visible = allHidden === false;
          } else {
            node.visible = allHidden === false;
          }
        }
        if (!value) return;

        if (node.visible && !node.isLeaf) node.expand();
      };

      traverse(this);
    }
  }, {
    key: 'setData',
    value: function setData(newVal) {
      var instanceChanged = newVal !== this.root.data;
      this.root.setData(newVal);
      if (instanceChanged) {
        this._initDefaultCheckedNodes();
      }
    }
  }, {
    key: 'getNode',
    value: function getNode(data) {
      var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* getNodeKey */])(this.key, data);
      return this.nodesMap[key];
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertBefore({ data: data }, refNode);
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertAfter({ data: data }, refNode);
    }
  }, {
    key: 'remove',
    value: function remove(data) {
      var node = this.getNode(data);
      if (node) {
        node.parent.removeChild(node);
      }
    }
  }, {
    key: 'append',
    value: function append(data, parentData) {
      var parentNode = parentData ? this.getNode(parentData) : this.root;

      if (parentNode) {
        parentNode.insertChild({ data: data });
      }
    }
  }, {
    key: '_initDefaultCheckedNodes',
    value: function _initDefaultCheckedNodes() {
      var _this2 = this;

      var defaultCheckedKeys = this.defaultCheckedKeys || [];
      var nodesMap = this.nodesMap;

      defaultCheckedKeys.forEach(function (checkedKey) {
        var node = nodesMap[checkedKey];

        if (node) {
          node.setChecked(true, !_this2.checkStrictly);
        }
      });
    }
  }, {
    key: '_initDefaultCheckedNode',
    value: function _initDefaultCheckedNode(node) {
      var defaultCheckedKeys = this.defaultCheckedKeys || [];

      if (defaultCheckedKeys.indexOf(node.key) !== -1) {
        node.setChecked(true, !this.checkStrictly);
      }
    }
  }, {
    key: 'setDefaultCheckedKey',
    value: function setDefaultCheckedKey(newVal) {
      if (newVal !== this.defaultCheckedKeys) {
        this.defaultCheckedKeys = newVal;
        this._initDefaultCheckedNodes();
      }
    }
  }, {
    key: 'registerNode',
    value: function registerNode(node) {
      var key = this.key;
      if (!key || !node || !node.data) return;

      var nodeKey = node.key;
      if (nodeKey !== undefined) this.nodesMap[node.key] = node;
    }
  }, {
    key: 'deregisterNode',
    value: function deregisterNode(node) {
      var key = this.key;
      if (!key || !node || !node.data) return;

      var childNodes = node.childNodes;
      for (var i = 0, j = childNodes.length; i < j; i++) {
        var child = childNodes[i];
        this.deregisterNode(child);
      }

      delete this.nodesMap[node.key];
    }
  }, {
    key: 'getCheckedNodes',
    value: function getCheckedNodes() {
      var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var checkedNodes = [];
      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;

        childNodes.forEach(function (child) {
          if (!leafOnly && child.checked || leafOnly && child.isLeaf && child.checked) {
            checkedNodes.push(child.data);
          }

          traverse(child);
        });
      };

      traverse(this);

      return checkedNodes;
    }
  }, {
    key: 'getCheckedKeys',
    value: function getCheckedKeys() {
      var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var key = this.key;
      var allNodes = this._getAllNodes();
      var keys = [];
      allNodes.forEach(function (node) {
        if (!leafOnly || leafOnly && node.isLeaf) {
          if (node.checked) {
            keys.push((node.data || {})[key]);
          }
        }
      });
      return keys;
    }
  }, {
    key: '_getAllNodes',
    value: function _getAllNodes() {
      var allNodes = [];
      var nodesMap = this.nodesMap;
      for (var nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey)) {
          allNodes.push(nodesMap[nodeKey]);
        }
      }

      return allNodes;
    }
  }, {
    key: 'updateChildren',
    value: function updateChildren(key, data) {
      var node = this.nodesMap[key];
      if (!node) return;
      var childNodes = node.childNodes;
      for (var i = childNodes.length - 1; i >= 0; i--) {
        var child = childNodes[i];
        this.remove(child.data);
      }
      for (var _i = 0, j = data.length; _i < j; _i++) {
        var _child = data[_i];
        this.append(_child, node.data);
      }
    }
  }, {
    key: '_setCheckedKeys',
    value: function _setCheckedKeys(key) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var checkedKeys = arguments[2];

      var allNodes = this._getAllNodes().sort(function (a, b) {
        return b.level - a.level;
      });
      var cache = Object.create(null);
      var keys = Object.keys(checkedKeys);
      allNodes.forEach(function (node) {
        return node.setChecked(false, false);
      });
      for (var i = 0, j = allNodes.length; i < j; i++) {
        var node = allNodes[i];
        var nodeKey = node.data[key].toString();
        var checked = keys.indexOf(nodeKey) > -1;
        if (!checked) {
          if (node.checked && !cache[nodeKey]) {
            node.setChecked(false, false);
          }
          continue;
        }

        var parent = node.parent;
        while (parent && parent.level > 0) {
          cache[parent.data[key]] = true;
          parent = parent.parent;
        }

        if (node.isLeaf || this.checkStrictly) {
          node.setChecked(true, false);
          continue;
        }
        node.setChecked(true, true);

        if (leafOnly) {
          (function () {
            node.setChecked(false, false);
            var traverse = function traverse(node) {
              var childNodes = node.childNodes;
              childNodes.forEach(function (child) {
                if (!child.isLeaf) {
                  child.setChecked(false, false);
                }
                traverse(child);
              });
            };
            traverse(node);
          })();
        }
      }
    }
  }, {
    key: 'setCheckedNodes',
    value: function setCheckedNodes(array) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var key = this.key;
      var checkedKeys = {};
      array.forEach(function (item) {
        checkedKeys[(item || {})[key]] = true;
      });

      this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
  }, {
    key: 'setCheckedKeys',
    value: function setCheckedKeys(keys) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.defaultCheckedKeys = keys;
      var key = this.key;
      var checkedKeys = {};
      keys.forEach(function (key) {
        checkedKeys[key] = true;
      });

      this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
  }, {
    key: 'setDefaultExpandedKeys',
    value: function setDefaultExpandedKeys(keys) {
      var _this3 = this;

      keys = keys || [];
      this.defaultExpandedKeys = keys;

      keys.forEach(function (key) {
        var node = _this3.getNode(key);
        if (node) node.expand(null, _this3.autoExpandParent);
      });
    }
  }, {
    key: 'setChecked',
    value: function setChecked(data, checked, deep) {
      var node = this.getNode(data);

      if (node) {
        node.setChecked(!!checked, deep);
      }
    }
  }, {
    key: 'getCurrentNode',
    value: function getCurrentNode() {
      return this.currentNode;
    }
  }, {
    key: 'setCurrentNode',
    value: function setCurrentNode(node) {
      this.currentNode = node;
    }
  }, {
    key: 'setUserCurrentNode',
    value: function setUserCurrentNode(node) {
      var key = node[this.key];
      var currNode = this.nodesMap[key];
      this.setCurrentNode(currNode);
    }
  }, {
    key: 'setCurrentNodeKey',
    value: function setCurrentNodeKey(key) {
      var node = this.getNode(key);
      if (node) {
        this.currentNode = node;
      }
    }
  }]);

  return TreeStore;
}();

/* harmony default export */ __webpack_exports__["a"] = (TreeStore);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getChildState */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_merge__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var getChildState = function getChildState(node) {
  var all = true;
  var none = true;
  var allWithoutDisable = true;
  for (var i = 0, j = node.length; i < j; i++) {
    var n = node[i];
    if (n.checked !== true || n.indeterminate) {
      all = false;
      if (!n.disabled) {
        allWithoutDisable = false;
      }
    }
    if (n.checked !== false || n.indeterminate) {
      none = false;
    }
  }

  return { all: all, none: none, allWithoutDisable: allWithoutDisable, half: !all && !none };
};

var reInitChecked = function reInitChecked(node) {
  if (node.childNodes.length === 0) return;

  var _getChildState = getChildState(node.childNodes),
      all = _getChildState.all,
      none = _getChildState.none,
      half = _getChildState.half;

  if (all) {
    node.checked = true;
    node.indeterminate = false;
  } else if (half) {
    node.checked = false;
    node.indeterminate = true;
  } else if (none) {
    node.checked = false;
    node.indeterminate = false;
  }

  var parent = node.parent;
  if (!parent || parent.level === 0) return;

  if (!node.store.checkStrictly) {
    reInitChecked(parent);
  }
};

var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.store.props;
  var data = node.data || {};
  var config = props[prop];

  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    var dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};

var nodeIdSeed = 0;

var Node = function () {
  function Node(options) {
    _classCallCheck(this, Node);

    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.parent = null;
    this.visible = true;

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    // internal
    this.level = 0;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    var store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);

    var props = store.props;
    if (props && typeof props.isLeaf !== 'undefined') {
      var isLeaf = getPropertyFromData(this, 'isLeaf');
      if (typeof isLeaf === 'boolean') {
        this.isLeafByUser = isLeaf;
      }
    }

    if (store.lazy !== true && this.data) {
      this.setData(this.data);

      if (store.defaultExpandAll) {
        this.expanded = true;
      }
    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
      this.expand();
    }

    if (!this.data) return;
    var defaultExpandedKeys = store.defaultExpandedKeys;
    var key = store.key;
    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, store.autoExpandParent);
    }

    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
      store.currentNode = this;
    }

    if (store.lazy) {
      store._initDefaultCheckedNode(this);
    }

    this.updateLeafState();
  }

  _createClass(Node, [{
    key: 'setData',
    value: function setData(data) {
      if (!Array.isArray(data)) {
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* markNodeData */])(this, data);
      }

      this.data = data;
      this.childNodes = [];

      var children = void 0;
      if (this.level === 0 && this.data instanceof Array) {
        children = this.data;
      } else {
        children = getPropertyFromData(this, 'children') || [];
      }

      for (var i = 0, j = children.length; i < j; i++) {
        this.insertChild({ data: children[i] });
      }
    }
  }, {
    key: 'insertChild',
    value: function insertChild(child, index) {
      if (!child) throw new Error('insertChild error: child is required.');

      if (!(child instanceof Node)) {
        Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_merge__["a" /* default */])(child, {
          parent: this,
          store: this.store
        });
        child = new Node(child);
      }

      child.level = this.level + 1;

      if (typeof index === 'undefined' || index < 0) {
        this.childNodes.push(child);
      } else {
        this.childNodes.splice(index, 0, child);
      }

      this.updateLeafState();
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(child, ref) {
      var index = void 0;
      if (ref) {
        index = this.childNodes.indexOf(ref);
      }
      this.insertChild(child, index);
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(child, ref) {
      var index = void 0;
      if (ref) {
        index = this.childNodes.indexOf(ref);
        if (index !== -1) index += 1;
      }
      this.insertChild(child, index);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      var index = this.childNodes.indexOf(child);

      if (index > -1) {
        this.store && this.store.deregisterNode(child);
        child.parent = null;
        this.childNodes.splice(index, 1);
      }

      this.updateLeafState();
    }
  }, {
    key: 'removeChildByData',
    value: function removeChildByData(data) {
      var targetNode = null;
      this.childNodes.forEach(function (node) {
        if (node.data === data) {
          targetNode = node;
        }
      });

      if (targetNode) {
        this.removeChild(targetNode);
      }
    }
  }, {
    key: 'expand',
    value: function expand(callback, expandParent) {
      var _this = this;

      var done = function done() {
        if (expandParent) {
          var parent = _this.parent;
          while (parent.level > 0) {
            parent.expanded = true;
            parent = parent.parent;
          }
        }
        _this.expanded = true;
        if (callback) callback();
      };

      if (this.shouldLoadData()) {
        this.loadData(function (data) {
          if (data instanceof Array) {
            if (_this.checked) {
              _this.setChecked(true, true);
            } else {
              reInitChecked(_this);
            }
            done();
          }
        });
      } else {
        done();
      }
    }
  }, {
    key: 'doCreateChildren',
    value: function doCreateChildren(array) {
      var _this2 = this;

      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      array.forEach(function (item) {
        _this2.insertChild(Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_merge__["a" /* default */])({ data: item }, defaultProps));
      });
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.expanded = false;
    }
  }, {
    key: 'shouldLoadData',
    value: function shouldLoadData() {
      return this.store.lazy === true && this.store.load && !this.loaded;
    }
  }, {
    key: 'updateLeafState',
    value: function updateLeafState() {
      if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
        this.isLeaf = this.isLeafByUser;
        return;
      }
      var childNodes = this.childNodes;
      if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
        this.isLeaf = !childNodes || childNodes.length === 0;
        return;
      }
      this.isLeaf = false;
    }
  }, {
    key: 'setChecked',
    value: function setChecked(value, deep, recursion, passValue) {
      var _this3 = this;

      this.indeterminate = value === 'half';
      this.checked = value === true;

      if (this.store.checkStrictly) return;

      if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
        var _getChildState2 = getChildState(this.childNodes),
            all = _getChildState2.all,
            allWithoutDisable = _getChildState2.allWithoutDisable;

        if (!this.isLeaf && !all && allWithoutDisable) {
          this.checked = false;
          value = false;
        }

        var handleDescendants = function handleDescendants() {
          if (deep) {
            var childNodes = _this3.childNodes;
            for (var i = 0, j = childNodes.length; i < j; i++) {
              var child = childNodes[i];
              passValue = passValue || value !== false;
              var isCheck = child.disabled ? child.checked : passValue;
              child.setChecked(isCheck, deep, true, passValue);
            }

            var _getChildState3 = getChildState(childNodes),
                half = _getChildState3.half,
                _all = _getChildState3.all;

            if (!_all) {
              _this3.checked = _all;
              _this3.indeterminate = half;
            }
          }
        };

        if (this.shouldLoadData()) {
          // Only work on lazy load data.
          this.loadData(function () {
            handleDescendants();
            reInitChecked(_this3);
          }, {
            checked: value !== false
          });
          return;
        } else {
          handleDescendants();
        }
      }

      var parent = this.parent;
      if (!parent || parent.level === 0) return;

      if (!recursion) {
        reInitChecked(parent);
      }
    }
  }, {
    key: 'getChildren',
    value: function getChildren() {
      // this is data
      var data = this.data;
      if (!data) return null;

      var props = this.store.props;
      var children = 'children';
      if (props) {
        children = props.children || 'children';
      }

      if (data[children] === undefined) {
        data[children] = null;
      }

      return data[children];
    }
  }, {
    key: 'updateChildren',
    value: function updateChildren() {
      var _this4 = this;

      var newData = this.getChildren() || [];
      var oldData = this.childNodes.map(function (node) {
        return node.data;
      });

      var newDataMap = {};
      var newNodes = [];

      newData.forEach(function (item, index) {
        if (item[__WEBPACK_IMPORTED_MODULE_1__util__["a" /* NODE_KEY */]]) {
          newDataMap[item[__WEBPACK_IMPORTED_MODULE_1__util__["a" /* NODE_KEY */]]] = { index: index, data: item };
        } else {
          newNodes.push({ index: index, data: item });
        }
      });

      oldData.forEach(function (item) {
        if (!newDataMap[item[__WEBPACK_IMPORTED_MODULE_1__util__["a" /* NODE_KEY */]]]) _this4.removeChildByData(item);
      });

      newNodes.forEach(function (_ref) {
        var index = _ref.index,
            data = _ref.data;

        _this4.insertChild({ data: data }, index);
      });

      this.updateLeafState();
    }
  }, {
    key: 'loadData',
    value: function loadData(callback) {
      var _this5 = this;

      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
        this.loading = true;

        var resolve = function resolve(children) {
          _this5.loaded = true;
          _this5.loading = false;
          _this5.childNodes = [];

          _this5.doCreateChildren(children, defaultProps);

          _this5.updateLeafState();
          if (callback) {
            callback.call(_this5, children);
          }
        };

        this.store.load(this, resolve);
      } else {
        if (callback) {
          callback.call(this);
        }
      }
    }
  }, {
    key: 'label',
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }, {
    key: 'icon',
    get: function get() {
      return getPropertyFromData(this, 'icon');
    }
  }, {
    key: 'key',
    get: function get() {
      var nodeKey = this.store.key;
      if (this.data) return this.data[nodeKey];
      return null;
    }
  }, {
    key: 'disabled',
    get: function get() {
      return getPropertyFromData(this, 'disabled');
    }
  }]);

  return Node;
}();

/* harmony default export */ __webpack_exports__["a"] = (Node);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
});;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tree_node_vue__ = __webpack_require__(4);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_387b92c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tree_node_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tree_node_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_387b92c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tree_node_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_387b92c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tree_node_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/tree-node.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-387b92c8", Component.options)
  } else {
    hotAPI.reload("data-v-387b92c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_dom__ = __webpack_require__(19);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Transition = function () {
  function Transition() {
    _classCallCheck(this, Transition);
  }

  _createClass(Transition, [{
    key: 'beforeEnter',
    value: function beforeEnter(el) {
      Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_dom__["a" /* addClass */])(el, 'collapse-transition');
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  }, {
    key: 'enter',
    value: function enter(el) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';
    }
  }, {
    key: 'afterEnter',
    value: function afterEnter(el) {
      // for safari: remove class then reset height is necessary
      Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_dom__["b" /* removeClass */])(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    }
  }, {
    key: 'beforeLeave',
    value: function beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    }
  }, {
    key: 'leave',
    value: function leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_dom__["a" /* addClass */])(el, 'collapse-transition');
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    }
  }, {
    key: 'afterLeave',
    value: function afterLeave(el) {
      Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_dom__["b" /* removeClass */])(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }]);

  return Transition;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElCollapseTransition',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;

    var data = {
      on: new Transition()
    };

    return h('transition', data, children);
  }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export on */
/* unused harmony export off */
/* unused harmony export once */
/* unused harmony export hasClass */
/* harmony export (immutable) */ __webpack_exports__["a"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeClass;
/* unused harmony export getStyle */
/* unused harmony export setStyle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* istanbul ignore next */



var isServer = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
var on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
var getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_checkbox__ = __webpack_require__(21);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__src_checkbox__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__src_checkbox__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__src_checkbox__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__src_checkbox__["a" /* default */]);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_583bb60b_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_checkbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_583bb60b_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_583bb60b_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules/element-ui/packages/checkbox/src/checkbox.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-583bb60b", Component.options)
  } else {
    hotAPI.reload("data-v-583bb60b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "label",
    {
      staticClass: "el-checkbox",
      class: [
        _vm.border && _vm.checkboxSize
          ? "el-checkbox--" + _vm.checkboxSize
          : "",
        { "is-disabled": _vm.isDisabled },
        { "is-bordered": _vm.border },
        { "is-checked": _vm.isChecked }
      ],
      attrs: {
        role: "checkbox",
        "aria-checked": _vm.indeterminate ? "mixed" : _vm.isChecked,
        "aria-disabled": _vm.isDisabled,
        id: _vm.id
      }
    },
    [
      _c(
        "span",
        {
          staticClass: "el-checkbox__input",
          class: {
            "is-disabled": _vm.isDisabled,
            "is-checked": _vm.isChecked,
            "is-indeterminate": _vm.indeterminate,
            "is-focus": _vm.focus
          },
          attrs: { "aria-checked": "mixed" }
        },
        [
          _c("span", { staticClass: "el-checkbox__inner" }),
          _vm._v(" "),
          _vm.trueLabel || _vm.falseLabel
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.model,
                    expression: "model"
                  }
                ],
                staticClass: "el-checkbox__original",
                attrs: {
                  type: "checkbox",
                  name: _vm.name,
                  disabled: _vm.isDisabled,
                  "true-value": _vm.trueLabel,
                  "false-value": _vm.falseLabel
                },
                domProps: {
                  checked: Array.isArray(_vm.model)
                    ? _vm._i(_vm.model, null) > -1
                    : _vm._q(_vm.model, _vm.trueLabel)
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.model,
                        $$el = $event.target,
                        $$c = $$el.checked ? _vm.trueLabel : _vm.falseLabel
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.model = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.model = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.model = $$c
                      }
                    },
                    _vm.handleChange
                  ],
                  focus: function($event) {
                    _vm.focus = true
                  },
                  blur: function($event) {
                    _vm.focus = false
                  }
                }
              })
            : _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.model,
                    expression: "model"
                  }
                ],
                staticClass: "el-checkbox__original",
                attrs: {
                  type: "checkbox",
                  disabled: _vm.isDisabled,
                  name: _vm.name
                },
                domProps: {
                  value: _vm.label,
                  checked: Array.isArray(_vm.model)
                    ? _vm._i(_vm.model, _vm.label) > -1
                    : _vm.model
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.model,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = _vm.label,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.model = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.model = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.model = $$c
                      }
                    },
                    _vm.handleChange
                  ],
                  focus: function($event) {
                    _vm.focus = true
                  },
                  blur: function($event) {
                    _vm.focus = false
                  }
                }
              })
        ]
      ),
      _vm._v(" "),
      _vm.$slots.default || _vm.label
        ? _c(
            "span",
            { staticClass: "el-checkbox__label" },
            [
              _vm._t("default"),
              _vm._v(" "),
              !_vm.$slots.default ? [_vm._v(_vm._s(_vm.label))] : _vm._e()
            ],
            2
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-583bb60b", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.node.visible,
          expression: "node.visible"
        }
      ],
      staticClass: "el-tree-node",
      class: {
        "is-expanded": _vm.expanded,
        "is-current": _vm.tree.store.currentNode === _vm.node,
        "is-hidden": !_vm.node.visible,
        "is-focusable": !_vm.node.disabled,
        "is-checked": !_vm.node.disabled && _vm.node.checked
      },
      attrs: {
        role: "treeitem",
        tabindex: "-1",
        "aria-expanded": _vm.expanded,
        "aria-disabled": _vm.node.disabled,
        "aria-checked": _vm.node.checked
      },
      on: {
        click: function($event) {
          $event.stopPropagation()
          _vm.handleClick($event)
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "el-tree-node__content",
          style: {
            "padding-left": (_vm.node.level - 1) * _vm.tree.indent + "px"
          }
        },
        [
          _c("span", {
            staticClass: "el-tree-node__expand-icon el-icon-caret-right",
            class: {
              "is-leaf": _vm.node.isLeaf,
              expanded: !_vm.node.isLeaf && _vm.expanded
            },
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.handleExpandIconClick($event)
              }
            }
          }),
          _vm._v(" "),
          _vm.showCheckbox
            ? _c("el-checkbox", {
                attrs: {
                  indeterminate: _vm.node.indeterminate,
                  disabled: !!_vm.node.disabled
                },
                on: { change: _vm.handleCheckChange },
                nativeOn: {
                  click: function($event) {
                    $event.stopPropagation()
                  }
                },
                model: {
                  value: _vm.node.checked,
                  callback: function($$v) {
                    _vm.$set(_vm.node, "checked", $$v)
                  },
                  expression: "node.checked"
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.node.loading
            ? _c("span", {
                staticClass: "el-tree-node__loading-icon el-icon-loading"
              })
            : _vm._e(),
          _vm._v(" "),
          _c("node-content", { attrs: { node: _vm.node } }),
          _vm._v(" "),
          _vm.node.store.horizontal
            ? _c("span", {
                staticClass:
                  "el-tree-node__expand-icon el-icon-caret-right right-icon",
                class: { "is-leaf": _vm.node.isLeaf }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      !_vm.tree.$props.horizontal
        ? _c("el-collapse-transition", [
            !_vm.renderAfterExpand || _vm.childNodeRendered
              ? _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.expanded,
                        expression: "expanded"
                      }
                    ],
                    staticClass: "el-tree-node__children",
                    attrs: { role: "group", "aria-expanded": _vm.expanded }
                  },
                  _vm._l(_vm.node.childNodes, function(child) {
                    return _c("el-tree-node", {
                      key: _vm.getNodeKey(child),
                      attrs: {
                        "render-content": _vm.renderContent,
                        "render-after-expand": _vm.renderAfterExpand,
                        node: child
                      },
                      on: { "node-expand": _vm.handleChildNodeExpand }
                    })
                  })
                )
              : _vm._e()
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-387b92c8", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return t; });
/* unused harmony export use */
/* unused harmony export i18n */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_locale_lang_zh_CN__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_deepmerge__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_deepmerge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_deepmerge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__format__ = __webpack_require__(27);





var format = Object(__WEBPACK_IMPORTED_MODULE_3__format__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1_vue___default.a);
var lang = __WEBPACK_IMPORTED_MODULE_0_element_ui_src_locale_lang_zh_CN__["a" /* default */];
var merged = false;
var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this || __WEBPACK_IMPORTED_MODULE_1_vue___default.a).$t;
  if (typeof vuei18n === 'function' && !!__WEBPACK_IMPORTED_MODULE_1_vue___default.a.locale) {
    if (!merged) {
      merged = true;
      __WEBPACK_IMPORTED_MODULE_1_vue___default.a.locale(__WEBPACK_IMPORTED_MODULE_1_vue___default.a.config.lang, __WEBPACK_IMPORTED_MODULE_2_deepmerge___default()(lang, __WEBPACK_IMPORTED_MODULE_1_vue___default.a.locale(__WEBPACK_IMPORTED_MODULE_1_vue___default.a.config.lang) || {}, { clone: true }));
    }
    return vuei18n.apply(this, arguments);
  }
};

var t = function t(path, options) {
  var value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  var array = path.split('.');
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

var use = function use(l) {
  lang = l || lang;
};

var i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

/* unused harmony default export */ var _unused_webpack_default_export = ({ use: use, t: t, i18n: i18n });

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    }
  }
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_util__ = __webpack_require__(28);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = Object(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_util__["a" /* hasOwn */])(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export noop */
/* harmony export (immutable) */ __webpack_exports__["a"] = hasOwn;
/* unused harmony export toObject */
/* unused harmony export getValueByPath */
/* unused harmony export getPropByPath */
/* unused harmony export generateId */
/* unused harmony export valueEquals */
var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

var getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-tree",
      class: { "el-tree--highlight-current": _vm.highlightCurrent },
      attrs: { role: "tree" }
    },
    [
      _vm.horizontal
        ? _c(
            "div",
            { class: [_vm.treeNodeWrapperClass, "el-tree-node-wrapper"] },
            [
              _c(
                "div",
                { staticClass: "el-tree-node-block" },
                _vm._l(_vm.root.childNodes, function(child) {
                  return _c("el-tree-node", {
                    key: _vm.getNodeKey(child),
                    attrs: {
                      node: child,
                      props: _vm.props,
                      "render-after-expand": _vm.renderAfterExpand,
                      "render-content": _vm.renderContent
                    },
                    on: { "node-expand": _vm.handleNodeExpand }
                  })
                })
              ),
              _vm._v(" "),
              _vm._l(_vm.store.levelShow, function(level) {
                return _c(
                  "div",
                  { key: level.id, staticClass: "el-tree-node-block" },
                  _vm._l(level.childNodes, function(child) {
                    return _c("el-tree-node", {
                      key: _vm.getNodeKey(child),
                      attrs: {
                        node: child,
                        props: _vm.props,
                        "render-after-expand": _vm.renderAfterExpand,
                        "render-content": _vm.renderContent
                      },
                      on: { "node-expand": _vm.handleNodeExpand }
                    })
                  })
                )
              })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.horizontal
        ? _vm._l(_vm.root.childNodes, function(child) {
            return _c("el-tree-node", {
              key: _vm.getNodeKey(child),
              attrs: {
                node: child,
                props: _vm.props,
                "render-after-expand": _vm.renderAfterExpand,
                "render-content": _vm.renderContent
              },
              on: { "node-expand": _vm.handleNodeExpand }
            })
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.root.childNodes || _vm.root.childNodes.length === 0
        ? _c("div", { staticClass: "el-tree__empty-block" }, [
            _c("span", { staticClass: "el-tree__empty-text" }, [
              _vm._v(_vm._s(_vm.emptyText))
            ])
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e17f1412", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })
/******/ ]);
});