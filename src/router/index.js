exports.routes = [
  {
    path: '/',
    component: '../pages/index',
    routes: [
      {
        path: '/',
        component: '../pages/home/home',
      },
      {
        path: '/form',
        component: '../pages/form/form',
      },
    ],
  },
  {
    path: '/login',
    component: '../pages/login',
  },
];
