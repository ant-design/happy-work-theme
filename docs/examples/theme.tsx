/* eslint no-console:0 */

import {
  Button,
  Checkbox,
  ConfigProvider,
  Divider,
  Radio,
  Space,
  Switch,
  Tag,
  version
} from 'antd';
import * as React from 'react';
import { HappyProvider } from '../../src';

const COLORS = {
  default: undefined,
  lark: '#00b96b',
  aliyun: '#ff6a00',
};

const Demo = () => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<string>('default');

  const token: Record<string, string> = {};
  const themeColor = COLORS[theme];

  if (themeColor) {
    token.colorPrimary = themeColor;
  }

  return (
    <>
      <Switch
        checkedChildren="Enabled"
        unCheckedChildren="Disable"
        checked={!disabled}
        onChange={() => setDisabled((d) => !d)}
      />
      <Divider />
      <ConfigProvider
        theme={{
          token,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBlock: 32,
            rowGap: 32,
          }}
        >
          <ul>
            <li>React v{React.version}</li>
            <li>antd v{version}</li>
          </ul>
          <HappyProvider disabled={disabled}>
            <Radio.Group
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              options={['default', 'lark', 'aliyun']}
            />

            <Space>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="primary" danger>
                Danger Not Happy
              </Button>
              <Button type="text">Text Not Happy</Button>
              <Button type="link">Link Not Happy</Button>
            </Space>
            <Space>
              <Switch checkedChildren="So Happy" unCheckedChildren="So Happy" />
              <Tag onClick={() => {}}>Tag</Tag>
            </Space>

            <Checkbox.Group
              options={new Array(3)
                .fill(null)
                .map((_, index) => `option-${index}`)}
            />
          </HappyProvider>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Demo;
