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

  it('should return custom render', () => {
    const { unstableSetRender } = require('../src/_utils/unstable-render');
    const customRender = jest.fn();
    const _render = unstableSetRender(customRender);
    expect(_render).toBe(customRender);
    expect(unstableSetRender()).toBe(customRender);
  });
});

describe(`antd@5.24.9`, () => {
  let antdRender = jest.fn();
  beforeAll(async () => {
    jest.resetModules();
    const originalAntd = jest.requireActual('antd');
    jest.doMock('antd', () => ({
      ...originalAntd,
      version: '5.24.9',
      unstableSetRender: (_r) => {
        antdRender = _r;
        return _r;
      },
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

  it('should return latest render', () => {
    const { unstableSetRender } = require('../src/_utils/unstable-render');
    const _render = unstableSetRender();
    expect(_render).toBe(antdRender);
  });

  it('custom render will not override', () => {
    const { unstableSetRender } = require('../src/_utils/unstable-render');
    const customRender = jest.fn();
    const _render = unstableSetRender(customRender);
    expect(_render).toBe(antdRender);
    expect(unstableSetRender()).toBe(antdRender);
  });
});
