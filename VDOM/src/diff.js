import { render } from "./render";
export const nodePatchTypes = {
  CREATE: "create node",
  REMOVE: "remove node",
  REPLACE: "replace node",
  UPDATE: "update node",
};

export const propPatchTypes = {
  REMOVE: "remove prop",
  UPDATE: "update prop",
};

export const diff = (oldVDOM, newVDOM) => {
  // 新建 node
  if (oldVDOM === undefined) {
    return {
      type: nodePatchTypes.CREATE,
      vdom: newVDOM,
    };
  }

  // 删除 node
  if (newVDOM === undefined) {
    return {
      type: nodePatchTypes.REMOVE,
    };
  }

  // 替换 node
  if (
    typeof oldVDOM !== typeof newVDOM ||
    ((typeof oldVDOM === "string" || typeof oldVDOM === "number") &&
      oldVDOM !== newVDOM) ||
    oldVDOM.type !== newVDOM.type
  ) {
    return {
      type: nodePatchTypes.REPLACE,
      vdom: newVDOM,
    };
  }

  // 更新 node
  if (oldVDOM.type) {
    // 比较 props 的变化
    const propsDiff = diffProps(oldVDOM, newVDOM);

    // 比较 children 的变化
    const childrenDiff = diffChildren(oldVDOM, newVDOM);

    // 如果 props 或者 children 有变化，才需要更新
    if (
      Object.keys(propsDiff).length > 0 ||
      childrenDiff.some((patchObj) => patchObj !== undefined)
    ) {
      return {
        type: nodePatchTypes.UPDATE,
        props: {
          ...propsDiff,
          children: childrenDiff,
        },
      };
    }
  }
};

// 比较 props 的变化
function diffProps(oldVDOM, newVDOM) {
  let patches = {};

  const allProps = { ...oldVDOM.props, ...newVDOM.props };

  // 获取新旧所有属性名后，再逐一判断新旧属性值
  Object.keys(allProps).forEach((key) => {
    if (key === undefined) return null;
    const oldValue = oldVDOM.props[key];
    const newValue = newVDOM.props[key];

    // 删除属性
    if (key !== "children" && newValue === undefined) {
      Object.assign(patches, {
        type: propPatchTypes.REMOVE,
        key,
      });
    } else if (
      key !== "children" &&
      (oldValue === undefined || oldValue !== newValue)
    ) {
      Object.assign(patches, {
        type: propPatchTypes.UPDATE,
        key,
        newValue,
      });
    }
  });

  return patches;
}

// 比较 children 的变化
function diffChildren(oldVDOM, newVDOM) {
  const patches = [];

  // 获取子元素最大长度
  const childLength = Math.max(
    oldVDOM.props.children.length,
    newVDOM.props.children.length
  );

  // 遍历并 diff 子元素
  for (let i = 0; i < childLength; i++) {
    patches.push(diff(oldVDOM.props.children[i], newVDOM.props.children[i]));
  }

  return patches;
}

// 给 DOM 打补丁
export const patch = (parent, patchObj, index = 0) => {
  if (!patchObj) {
    return;
  }

  if (patchObj.type === nodePatchTypes.CREATE) {
    return render(patchObj.vdom, parent);
  }

  if (!parent) return;
  const element = parent.childNodes[index];

  // 删除元素
  if (patchObj.type === nodePatchTypes.REMOVE) {
    return parent.removeChild(element);
  }

  // 替换元素
  if (patchObj.type === nodePatchTypes.REPLACE) {
    return parent.raplaceChild(createElement(patchObj.vdom), element);
  }

  // 更新元素
  if (patchObj.type === nodePatchTypes.UPDATE) {
    const { children } = patchObj.props;

    const props = children.props;
    patchProps(element, props);

    children.forEach((p, i) => {
      if (!p) return;

      patch(element, p, i);
    });
  }
};

function patchProps(element, props) {
  if (!props) {
    return;
  }

  props.forEach((patchObj) => {
    // 删除属性
    if (patchObj.type === propsPatchTypes.REMOVE) {
      element.removeAttribute(patchObj.key);
    }

    // 更新或创建属性
    else if (patchObj.type === propsPatchTypes.UPDATE) {
      element.setAttribute(patchObj.key, patchObj.value);
    }
  });
}
