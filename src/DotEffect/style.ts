import { createTheme, Keyframes, useStyleRegister } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd';

const DEFAULT_THEME = createTheme((token) => token);

export const TARGET_ATTR = 'data-happy-wave-target';

const antWaveTargetEffect = new Keyframes('antWaveTargetEffect', {
  '0%': {
    transform: 'scale(1)',
  },
  '10%': {
    transform: 'scale(1.1)',
  },
  '35%': {
    transform: 'scale(0.94)',
  },
  '60%': {
    transform: 'scale(1.05)',
  },
  '85%': {
    transform: 'scale(0.97)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

const antWaveDotEffect = new Keyframes('antWaveDotEffect', {
  '0%': {
    opacity: 0,
    left: `var(--start-x)`,
    top: `var(--start-y)`,
    width: `var(--start-size)`,
    height: `var(--start-size)`,
    background: `var(--background)`,
    border: `var(--border)`,
  },
  '25%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.8,
  },
  '100%': {
    opacity: 0,
    left: `var(--end-x)`,
    top: `var(--end-y)`,
    width: `var(--end-size)`,
    height: `var(--end-size)`,
    background: `var(--background)`,
    border: `var(--border)`,
  },
});

export default function useStyle(
  prefixCls: string,
  hashId: string,
  token: GlobalToken,
) {
  const sharedConfig = {
    theme: DEFAULT_THEME,
    token,
    // nonce: () => csp?.nonce!,
  };

  useStyleRegister(
    {
      ...sharedConfig,
      path: ['HappyWorkTheme', 'target'],
    },
    () => ({
      // ======================== Target ========================
      [`[${TARGET_ATTR}-${hashId}], & [${TARGET_ATTR}-${hashId}]`]: {
        animationName: antWaveTargetEffect,
        animationDuration: `0.45s`,
        animationTimingFunction: 'ease-in-out',
        animationFillMode: 'backwards',
      },
    }),
  );

  useStyleRegister(
    {
      ...sharedConfig,
      hashId,
      path: ['HappyWorkTheme', 'effect'],
    },
    () => {
      const dotPrefixCls = `.${prefixCls}`;

      return [
        {
          // ========================= Dots =========================
          [dotPrefixCls]: {
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 999,

            [`${dotPrefixCls}-dot`]: {
              boxSizing: 'border-box',
              position: 'absolute',
              borderRadius: '100%',
              opacity: 0,
              transform: 'translate(-50%, -50%)',

              // Start Position
              zIndex: 999,

              // =================== Basic Motion ===================
              '&.happy-in-out': {
                animationName: antWaveDotEffect,
                animationDuration: token.motionDurationSlow,
                // animationDuration: '10s',
                animationTimingFunction: 'linear',
                animationFillMode: 'backwards',
              },
            },
          },
        },
      ];
    },
  );
}
