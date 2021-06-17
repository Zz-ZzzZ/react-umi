const PROJECT_TITLE = 'React Admin';

export default [
  {
    path: '/login',
    component: '@/pages/login/Login',
    exact: true,
    title: `登录 - ${PROJECT_TITLE}`,
  },
  {
    path: '/',
    component: '@/pages/Index',
    wrappers: ['@/wrappers/Auth'],
    routes: [
      {
        exact: true,
        path: '/',
        component: '@/pages/home/Home',
        title: `总览 - ${PROJECT_TITLE}`,
      },
      {
        exact: true,
        path: '/table',
        component: '@/pages/table/Table',
        title: `表格 - ${PROJECT_TITLE}`,
      },
      {
        exact: true,
        path: '/mark-down',
        component: '@/pages/mark-down/MarkDown',
        title: `MarkDown - ${PROJECT_TITLE}`,
      },
      {
        exact: true,
        path: '/person',
        component: '@/pages/person/Person',
        title: `个人设置 - ${PROJECT_TITLE}`,
      },
      {
        exact: true,
        path: '/image-crop',
        component: '@/pages/image-crop/ImageCrop',
        title: `图片裁剪 - ${PROJECT_TITLE}`,
      },
      {
        exact: true,
        path: '/map',
        component: '@/pages/map/Map',
        title: `地图 - ${PROJECT_TITLE}`,
      },
    ],
  },
];
