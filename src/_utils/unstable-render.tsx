import * as antd from 'antd';
import { render, unmount } from 'rc-util/lib/React/render';
import warningOnce from 'rc-util/lib/warning';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

type UnmountType = () => Promise<void>;
type RenderType = (
  node: React.ReactElement,
  container: Element | DocumentFragment,
) => UnmountType;

const can_be_used_with_dep = () => {
  const [major, minor, patch] = antd.version
    .split('.')
    .map((v) => parseInt(v, 10));

  // https://github.com/ant-design/ant-design/pull/53662, 5.24.9
  return major === 5 && (minor > 24 || (minor === 24 && patch > 8));
};

const isCompatible = can_be_used_with_dep();

const defaultReactRender: RenderType = (node, container) => {
  if (isCompatible) {
    return (antd as any).unstableSetRender()(node, container);
  } else if (process.env.NODE_ENV !== 'production') {
    const majorVersion = parseInt(React.version.split('.')[0], 10);
    const fullKeys = Object.keys(ReactDOM);

    // Warning for React 19
    warningOnce(
      majorVersion < 19 || fullKeys.includes('createRoot'),
      `[Compatible] happy-work-theme only support React is 16 ~ 18. see https://u.ant.design/v5-for-19 for compatible.`,
    );
  }

  render(node, container);
  return () => unmount(container);
};

let unstableRender: RenderType = defaultReactRender;

/**
 * @deprecated Set React render function for compatible usage.
 * This is internal usage only compatible with React 19.
 * And will be removed in next major version.
 * Use only when `antd` version is lower than 5.24.9
 */
export function unstableSetRender(render?: RenderType) {
  if (render) {
    unstableRender = render;

    if (process.env.NODE_ENV !== 'production') {
      warningOnce(
        !isCompatible,
        [
          `[happy-work-theme] Please use \`import @ant-design/v5-patch-for-react-19\` instead`,
          `This method is only used when the antd version is lower than \`5.24.9\`, currently version is \`${antd.version}\``,
          `Read more at https://u.ant.design/v5-for-19, https://github.com/ant-design/happy-work-theme/pull/48`,
        ].join('\n'),
      );
    }
  }

  return unstableRender;
}

export function getReactRender() {
  return unstableRender;
}
