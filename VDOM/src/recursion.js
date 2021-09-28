/**
 * 使用递归方式先序遍历 DOM 树
 */
import { trimNode } from "./utils";
import { NODE_TYPE } from "./constants";
const { ELEMENT_NODE, TEXT_NODE } = NODE_TYPE;

export function recursion(node) {
  let obj = {};
  if (node && node.nodeType === TEXT_NODE) {
    const val = trimNode(node);
    if (val) {
      obj = Object.assign(obj, {
        children: val,
      });
    }
  }
  if (node && node.nodeType === ELEMENT_NODE) {
    let props = {};
    let children = [];
    Array.from(node.attributes).forEach((n) => (props[n.name] = n.value));
    node.childNodes.forEach((child) => {
      if (child.nodeType === ELEMENT_NODE || child.nodeType === TEXT_NODE) {
        children = children.concat(recursion(child));
      }
      props.children = children;
    });
    obj = Object.assign(
      obj,
      {
        type: node.tagName.toLowerCase(),
      },
      Object.keys(props).length !== 0 && {
        props: props,
      }
    );
  }
  if (Object.keys(obj).length !== 0) {
    return obj;
  }
  return [];
}
