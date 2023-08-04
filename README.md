# @ant-design/happy-work-theme

Ant Design Happy Work Theme

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![build status][github-actions-image]][github-actions-url]
[![Test coverage][codecov-image]][codecov-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]
[![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/@ant-design/happy-work-theme.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@ant-design/happy-work-theme
[github-actions-image]: https://github.com/react-component/checkbox/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/checkbox/actions
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/checkbox/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/checkbox/branch/master
[david-url]: https://david-dm.org/react-component/checkbox
[david-image]: https://david-dm.org/react-component/checkbox/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/checkbox?type=dev
[david-dev-image]: https://david-dm.org/react-component/checkbox/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/@ant-design/happy-work-theme.svg?style=flat-square
[download-url]: https://npmjs.org/package/@ant-design/happy-work-theme
[bundlephobia-url]: https://bundlephobia.com/result?p=@ant-design/happy-work-theme
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@ant-design/happy-work-theme
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi

## Install

[![@ant-design/happy-work-theme](https://nodei.co/npm/@ant-design/happy-work-theme.png)](https://npmjs.org/package/@ant-design/happy-work-theme)

## Usage

Use HappyProvider to wrap your app.

```tsx
import { HappyProvider } from '@ant-design/happy-work-theme';
import { Button, Space, Switch } from 'antd';
import React from 'react';

const desc = 'Happy Work';

const App: React.FC = () => (
  <HappyProvider>
    <Space>
      <Button type="primary">{desc}</Button>
      <Switch checkedChildren={desc} unCheckedChildren={desc} />
    </Space>
  </HappyProvider>
);

export default App;
```

## API

### HappyProvider

Wrapper component will pass config with antd ConfigProvider.

## Development

```
npm install
npm start
```

## Test Case

```
npm test
npm run coverage
```

open coverage/ dir

## License

@ant-design/happy-work-theme is released under the MIT license.
