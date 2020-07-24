// @ts-nocheck
import { Plugin } from '/Users/yeyetu/Desktop/前端开发/umi_blog/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','getInitialState','request',],
});
plugin.register({
  apply: require('/Users/yeyetu/Desktop/前端开发/umi_blog/src/app.tsx'),
  path: '/Users/yeyetu/Desktop/前端开发/umi_blog/src/app.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
