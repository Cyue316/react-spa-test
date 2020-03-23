const menuConfig = [
  {
    title: '首页',
    path: '/',
    icon: 'home',
  },
  {
    title: '用户',
    path: '/user',
    icon: 'user',
    children: [
      {
        title: '联系',
        path: '/user/connect',
      },
      {
        title: '用户列表',
        path: '/user/list',
      },
    ]
  }
];

export default menuConfig;