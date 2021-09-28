/**
 * 判断节点是否为空节点，非空节点返回节点值，空节点返回 undefined
 * @param {Node} node DOM的节点
 * @returns { string | undefined } 返回节点值或者 undefined
 */
export function trimNode(node) {
  const val = node.nodeValue;
  if (val && !/\s+$/.test(val)) {
    return val;
  }
  return;
}
