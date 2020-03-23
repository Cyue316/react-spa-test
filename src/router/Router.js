import React from 'react';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import menuConfig from 'router/menuConfig';

const setMenu = (menu, pItem) => {
  return menu.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={ item.path }
                 title={ <span>{ item.title }</span> }>
          { setMenu(item.children, item) }
        </SubMenu>
      )
    }
    return (
      <Menu.Item title={ item.title } key={ item.path } pitem={ pItem }>
        <NavLink to={ item.path } >
          <span>{ item.title }</span>
        </NavLink>
      </Menu.Item>
    )
  });
};
const Home = React.lazy(() => import(/* webpackChunkName: "home" */'pages/Home/Home'));
const UserList = React.lazy(() => import(/* webpackChunkName: "userlist" */'pages/UserList/UserList'));
const UserConnect = React.lazy(() => import(/* webpackChunkName: "userconnect" */'pages/UserConnect/UserConnect'));
const NotFind = React.lazy(() => import(/* webpackChunkName: "notfind" */'pages/NotFind/NotFind'));

const Router = (props) => {
  const loggedIn = window.localStorage.getItem('token');
  let pathname = props.location.pathname;
  const currentKey = '/' + pathname.split('/')[1];
  const mainPage = (
    <Layout className={'app'}>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={[currentKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {setMenu(menuConfig)}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {<React.Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user/connect" component={UserConnect}/>
                <Route path="/user/list" component={UserList}/>
                <Route component={ NotFind }/>
              </Switch>
            </React.Suspense>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );

  return (
    loggedIn ? (
      mainPage
    ) : (
      <Redirect to="/login"/>
    )
  );
};

export default Router;