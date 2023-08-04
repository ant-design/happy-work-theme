import { act, fireEvent, render } from '@testing-library/react';
import { Button } from 'antd';
import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import * as React from 'react';
import { HappyProvider } from '../src';

describe('HappyWork', () => {
  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => document.body,
    });
  });

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  function waitEffect() {
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.advanceTimersByTime(50);
      });
    }
  }

  it('work', () => {
    const onClick = jest.fn();

    const { container } = render(
      <HappyProvider>
        <Button onClick={onClick} />
      </HappyProvider>,
    );

    // Click to show
    fireEvent.click(container.querySelector('button')!);
    waitEffect();

    expect(document.body.querySelector('.happy-wave')).toBeTruthy();
  });

  it('disabled', () => {
    const onClick = jest.fn();

    const { container } = render(
      <HappyProvider disabled>
        <Button onClick={onClick} />
      </HappyProvider>,
    );

    // Click to show
    fireEvent.click(container.querySelector('button')!);
    waitEffect();

    expect(document.body.querySelector('.happy-wave')).toBeFalsy();
  });
});
