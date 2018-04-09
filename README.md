# enhanced-el-tree

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/@xlaoyu/enhanced-el-tree.svg)](https://www.npmjs.com/package/@xlaoyu/enhanced-el-tree)
[![npm-downloades](https://img.shields.io/npm/dm/@xlaoyu/enhanced-el-tree.svg)](https://www.npmjs.com/package/@xlaoyu/enhanced-el-tree)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Yuliang-Lee/enhanced-el-tree/blob/master/LICENSE)

Base on element-ui's [tree component](http://element.eleme.io/#/en-US/component/tree), add some useful function and `horizontal-mode`

## Futures

### Horizontal Mode

Or can be said that is multiple-cascader component.Try it [Demo](https://codesandbox.io/s/5z70p4wv84)
![demo](https://user-images.githubusercontent.com/6936358/36945153-9fe4b352-1fe4-11e8-8c88-57e1916568f6.gif)

**restrict**：when use `horizontal mode`,some origin tree property would not take efffect, eg: _indent_, _accordion_ etc.

### Extra Attributes

| Attribute | Description | Type | Accepted Values | Default |
|:-----|:-----|:-----|:-----|:-----|
| horizontal | whether to activate horizontal mode | Boolean | - | false |
| tree-node-wrapper-class | add these class to horizontal block wrapper when activate horizontal mode | String | - | - |
| open-when-check | click checkbox to behave like a click tree node | Boolean | - | false |

### Extra Useful Methods

| Name | Description | Parameters |
|:-----|:-----|:-----|
|getAllCheckedKeys | like `getCheckedKeys` but includes _indeterminate nodes_ | |
|getAllCheckedNodes | like `getCheckedNodes` but includes _indeterminate nodes_ |
|setCheckedNodesPrecisely | Usually used with `getAllCheckedNodes` to restore the original state of the tree | an array of nodes get from `getAllCheckedKeys` |
|setCheckedKeysPrecisely | Usually used with `getAllCheckedKeys` to restore the original state of the tree | an array of keys get from `getAllCheckedKeys` |
|getCheckedKeysWithoutChild  | get checked node except all child checked nodes, look at the example below |  |
|getCheckedNodesWithoutChild | ditto |  |

`getCheckedKeysWithoutChild` example:

```js
/**
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
```

## Installation

```bash
$ npm install @xlaoyu/enhanced-el-tree -D
```

## Usage

```html
<template>
  <enhanced-el-tree horizontal></enhanced-el-tree>
</template>

<script>
import EnhancedElTree from '@xlaoyu/enhanced-el-tree';

// component constructor
{
  name: 'FooComponent',
  components: {
    EnhancedElTree
  }
}
</script>
```

## Denpencics

Vue@2.5.13

Element@2.2.1

## License

[MIT](./LICENSE) @ xlaoyu