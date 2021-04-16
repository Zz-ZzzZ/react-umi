export default [
  {
    path: '/login',
    component: '@/pages/login/login',
    exact: true,
  },
  {
    path: '/',
    component: '@/pages/index',
    wrappers: ['../wrappers/auth'],
    exact: true,
    routes: [
      {
        path: '/',
        component: '@/pages/home/home',
      },
      {
        path: '/form',
        component: '@/pages/form/form',
      },
    ],
  },
];
