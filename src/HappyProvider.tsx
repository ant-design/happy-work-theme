import { ConfigProvider } from 'antd';
import useEvent from 'rc-util/lib/hooks/useEvent';
import * as React from 'react';
import DotEffect from './DotEffect';
import { unstableSetRender } from './_utils/unstable-render';

type ConfigProviderProps = Parameters<typeof ConfigProvider>[0];

type WaveConfig = NonNullable<ConfigProviderProps>['wave'];

type ShowEffect = NonNullable<WaveConfig>['showEffect'];

export interface HappyProviderProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function HappyProvider(props: HappyProviderProps) {
  const { children, disabled } = props;

  // Using useState's lazy initialization to ensure unstableSetRender executes only once
  const [reactRender] = React.useState(unstableSetRender);

  const showEffect = useEvent<ShowEffect>((target, info) => {
    const { token, hashId } = info;

    // Create holder
    const holder = document.createElement('div');
    holder.style.position = 'absolute';
    holder.style.left = `0px`;
    holder.style.top = `0px`;
    document.body.appendChild(holder);

    const unmount = reactRender(
      <DotEffect
        target={target}
        token={token}
        hashId={hashId}
        onFinish={() => {
          unmount().then(() => {
            holder.parentElement?.removeChild(holder);
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
}
