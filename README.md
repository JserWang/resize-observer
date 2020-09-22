# resize-observer

Resize observer directive for vue 3.0

## Environment Support
Modern browsers 

## Installation

```bash
# yarn
yarn add @vue-toys/resize-observer

# or npm
npm install @vue-toys/resize-observer
```

## Usage

in `main.js` or `main.ts`

```javascript
import { createApp } from 'vue';
import ResizeObserver from '@vue-toys/resize-observer';
import App from './App.vue';

const app = createApp(App);

app.use(Resize);

app.mount('#app');
```

in `.vue` file template

```javascript
<template>
  <div v-resize="handleResize">
    Hello world!
  </div>
</template>

<script>
export default {
  methods: {
    handleResize({ width, height, offsetWidth, offsetHeight }) {
      console.log({ width, height, offsetWidth, offsetHeight })
    }
  }
}
</script>
```

in `.tsx` file

```javascript
import { defineComponent, h, resolveDirective, withDirectives } from 'vue';
import { Size } from '@vue-toys/resize-observer';

const handleResize = (e: Size) => {
  console.log(e);
};

export default defineComponent({
  render() {
    const vDemo = resolveDirective('resize');
    return withDirectives(h('div'), [[vDemo, handleResize]]);
  },
});
```

# TODO

use `@vue/test-utils` to test.
