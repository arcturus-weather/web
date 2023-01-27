import { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export default function () {
  const navbars = useMemo(() => {
    return [
      {
        key: '/',
        label: '天气图标',
      },
      {
        key: '/warnings',
        label: '预警图标',
      },
    ];
  }, []);

  const navigate = useNavigate();

  return (
    <Layout className="page-layout-wrapper">
      <Header className="header-wrapper">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={navbars}
          onClick={({ key }) => navigate(key)}
        />
      </Header>

      <Content className="content-wrapper">
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Iweather_icons ©2023 Created by ARCTURUS
      </Footer>
    </Layout>
  );
}
