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
      {
        exact: true,
        path: '/mark-down',
        component: '@/pages/mark-down/MarkDown',
      },
      {
        exact: true,
        path: '/person',
        component: '@/pages/person/Person',
      },
    ],
  },
];
