describe(`antd@5.24.5`, () => {
  beforeAll(async () => {
    jest.resetModules();
    const originalAntd = jest.requireActual('antd');
    jest.doMock('antd', () => ({
      ...originalAntd,
      version: '5.24.5',
    }));
  });

  afterAll(() => {
    jest.unmock('antd');
    jest.resetModules();
  });

  it('should work', () => {
    const _can = require('../src/_utils/unstable-render')._can;
    expect(_can()).toBeFalsy();
  });
});

describe(`antd@5.24.9`, () => {
  beforeAll(async () => {
    jest.resetModules();
    const originalAntd = jest.requireActual('antd');
    jest.doMock('antd', () => ({
      ...originalAntd,
      version: '5.24.9',
    }));
  });

  afterAll(() => {
    jest.unmock('antd');
    jest.resetModules();
  });

  it('should work', () => {
    const _can = require('../src/_utils/unstable-render')._can;
    expect(_can()).toBeTruthy();
  });
});
