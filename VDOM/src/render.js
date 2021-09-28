export function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // 将 props 分配给对应的节点
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  // 递归对每个 child 进行渲染操作
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

export const setProps = function (element, props) {
  for (key in props) {
    element.setAttribute(key, props[key]);
  }
};
