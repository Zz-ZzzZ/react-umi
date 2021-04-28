export default [
  {
    path: '/login',
    component: '@/pages/login/Login',
    exact: true,
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
      },
      {
        exact: true,
        path: '/table',
        component: '@/pages/table/Table',
      },
    ],
  },
];
