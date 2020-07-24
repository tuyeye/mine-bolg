// @ts-nocheck
import { ApplyPluginsType } from '/Users/yeyetu/Desktop/前端开发/umi_blog/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/pages/index').default,
    "title": "首页 - share 공유 하 다.",
    "exact": true
  },
  {
    "path": "/live",
    "component": require('@/pages/live').default,
    "title": "生活 - share 공유 하 다.",
    "exact": true
  },
  {
    "path": "/skill",
    "component": require('@/pages/skill').default,
    "title": "技术 - share 공유 하 다.",
    "exact": true
  },
  {
    "path": "/search/:searchKey",
    "component": require('@/pages/search').default,
    "title": "搜索 - share 공유 하 다.",
    "exact": true
  },
  {
    "path": "/detail/:id",
    "component": require('@/pages/detail').default,
    "title": "文章详情 - share 공유 하 다.",
    "exact": true
  },
  {
    "component": require('@/pages/assemblies/404').default,
    "title": "404 - share 공유 하 다.",
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
