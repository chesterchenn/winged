export const createElement = function (type, props, children) {
  return {
    type,
    props: {
      ...props,
      children: arguments.length > 3 ? [].slice.call(arguments, 2) : children,
    },
  };
};
