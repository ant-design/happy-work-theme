import { ConfigProvider } from 'antd';
import useEvent from 'rc-util/lib/hooks/useEvent';
import { render, unmount } from 'rc-util/lib/React/render';
import * as React from 'react';
import DotEffect from './DotEffect';

type ConfigProviderProps = Parameters<typeof ConfigProvider>[0];

type WaveConfig = NonNullable<ConfigProviderProps>['wave'];

type ShowEffect = NonNullable<WaveConfig>['showEffect'];

export interface HappyProviderProps {
  children?: React.ReactNode;
}

export default function HappyProvider(props: HappyProviderProps) {
  const { children } = props;

  const showEffect = useEvent<ShowEffect>((target, info) => {
    const { token, hashId } = info;

    // Create holder
    const holder = document.createElement('div');
    holder.style.position = 'absolute';
    holder.style.left = `0px`;
    holder.style.top = `0px`;
    document.body.appendChild(holder);

    render(
      <DotEffect
        target={target}
        token={token}
        hashId={hashId}
        onFinish={() => {
          unmount(holder).then(() => {
            holder.parentElement?.removeChild(holder);
          });
        }}
      />,
      holder,
    );
  });

  return <ConfigProvider wave={{ showEffect }}>{children}</ConfigProvider>;
}
