import ResizeObserver from 'resize-observer-polyfill';
import { Directive } from '@vue/runtime-core'
import { Size } from './index'

declare type ResizeHandler = (size: Size) => void;

export const initResizeObserver = (callback: ResizeHandler): ResizeObserver => {
  // cache the last size
  let lastSize: Size = {
    width: 0,
    height: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  };

  const handleResize: ResizeObserverCallback = (entries: Array<ResizeObserverEntry>) => {
    const target = entries[0].target as HTMLElement;
    const { width, height } = target.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = target;

    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);

    const { width: lastWidth, height: lastHeight, offsetWidth: lastOffsetWidth, offsetHeight: lastOffsetHeight } = lastSize

    // observer‘s callback is always triggered the first time
    if (lastWidth === 0 && lastHeight === 0 && lastOffsetWidth === 0 && lastOffsetHeight === 0) {
      lastSize = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight };
      return;
    }

    if (
      lastWidth !== fixedWidth ||
      lastHeight !== fixedHeight ||
      lastOffsetWidth !== offsetWidth ||
      lastOffsetHeight !== offsetHeight
    ) {
      lastSize = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight };

      if (callback) {
        // defer the callback but not defer to next frame
        Promise.resolve().then(() => {
          callback({ ...lastSize });
        });
      }
    }
  };

  const resizeObserver = new ResizeObserver(handleResize);
  return resizeObserver;
};

const directive: Directive = {
  mounted(el, { value }) {
    el._resizeObserver = initResizeObserver(value);
    el._resizeObserver.observe(el);
  },
  beforeUnmount(el) {
    if (el._resizeObserver) {
      el._resizeObserver.disconnect();
    }
  },
}

export default directive
