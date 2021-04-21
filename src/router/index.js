export default [
  {
    path: '/login',
    component: '@/pages/login/login',
    exact: true,
  },
  {
    path: '/',
    component: '@/pages/index',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        exact: true,
        path: '/',
        component: '@/pages/home/home',
      },
      {
        exact: true,
        path: '/table',
        component: '@/pages/table/table',
      },
    ],
  },
];
