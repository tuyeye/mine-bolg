import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dva:{},
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#25b864'
  },
  links: [
    {
      rel: 'icon',
      href: 'https://gw.alipayobjects.com/mdn/afts/img/A*tF_ZT5B56RUAAAAAAAAAAABjARQnAQ/original?bz=rms',
      type: 'image/x-icon'
    }
  ],
  routes: [
    { path: '/', component: '@/pages/index', title: '首页 - share 공유 하 다.' },
    { path: '/live', component: '@/pages/live', title: '生活 - share 공유 하 다.' },
    { path: '/skill', component: '@/pages/skill', title: '技术 - share 공유 하 다.' },
    { path: '/search/:searchKey', component: '@/pages/search', title: '搜索 - share 공유 하 다.' },
    { path: '/detail/:id', component: '@/pages/detail', title: '文章详情 - share 공유 하 다.' },
    { component: '@/pages/assemblies/404', title: '404 - share 공유 하 다.' },
  ],
});