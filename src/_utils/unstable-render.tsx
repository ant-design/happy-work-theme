import * as antd from 'antd';
import { render as defaultRender, unmount } from 'rc-util/lib/React/render';
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

export const unstableRender: RenderType = (node, container) => {
  if (isCompatible) {
    return (antd as any).unstableSetRender()(node, container);
  }

  if (process.env.NODE_ENV !== 'production') {
    const majorVersion = parseInt(React.version.split('.')[0], 10);
    const fullKeys = Object.keys(ReactDOM);

    // Warning for React 19
    warningOnce(
      majorVersion < 19 || fullKeys.includes('createRoot'),
      `[Compatible] happy-work-theme only support React is 16 ~ 18. see https://u.ant.design/v5-for-19 for compatible.`,
    );
  }

  defaultRender(node, container);
  return () => unmount(container);
};

/** @internal Test usage. Not work in prod */
export const _can = can_be_used_with_dep;
