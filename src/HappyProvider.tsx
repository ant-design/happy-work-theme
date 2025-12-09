import { ConfigProvider } from 'antd';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import * as React from 'react';
import DotEffect from './DotEffect';
import { render, unmount } from '@rc-component/util/lib/React/render';

type ConfigProviderProps = Parameters<typeof ConfigProvider>[0];

type WaveConfig = NonNullable<ConfigProviderProps>['wave'];

type ShowEffect = NonNullable<WaveConfig>['showEffect'];

export interface HappyProviderProps {
  disabled?: boolean;
}

const HappyProvider: React.FC<React.PropsWithChildren<HappyProviderProps>> = (
  props,
) => {
  const { children, disabled } = props;

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
            holder.remove();
          });
        }}
      />,
      holder,
    );
  });

  const waveConfig = React.useMemo(() => {
    if (disabled) {
      return {};
    }

    return {
      showEffect,
    };
  }, [disabled]);

  return <ConfigProvider wave={waveConfig}>{children}</ConfigProvider>;
};

export default HappyProvider;
