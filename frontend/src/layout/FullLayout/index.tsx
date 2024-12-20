import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
import logo from "../../assets/logo.jpg";
import HomeCodeandPromotion from "../../pages/admin/palm";
import Codes from "../../pages/admin/palm/code";
import CodeCreate from "../../pages/admin/palm/code/create";
import CodeEdit from "../../pages/admin/palm/code/edit";

const { Header, Content, Footer } = Layout;

const FullLayout: React.FC = () => {
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}

      <Layout>
        {/* Header with horizontal menu */}
        <Header style={{ background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 50, marginRight: 16 }} />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={[page ? page : "dashboard"]}>
              <Menu.Item key="dashboard" onClick={() => setCurrentPage("dashboard")}>
                <Link to="/">
                  <DashboardOutlined />
                  <span>แดชบอร์ด</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="code" onClick={() => setCurrentPage("code")}>
                <Link to="/code">
                  <UserOutlined />
                  <span>ข้อมูลสมา code</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="code" onClick={() => setCurrentPage("code")}>
                <Link to="/code">
                  <UserOutlined />
                  <span>ข้อมูลสมา code</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="code" onClick={() => setCurrentPage("code")}>
                <Link to="/code">
                  <UserOutlined />
                  <span>ข้อมูลสมา code</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="code" onClick={() => setCurrentPage("code")}>
                <Link to="/code">
                  <UserOutlined />
                  <span>ข้อมูลสมา code</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button onClick={Logout}>ออกจากระบบ</Button>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<HomeCodeandPromotion />} />
              <Route path="/code" element={<Codes />} />
              <Route path="/code/create" element={<CodeCreate />} />
              <Route path="/code/edit/:id" element={<CodeEdit />} />
            </Routes>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>IGOTSOFAR</Footer>
      </Layout>
    </Layout>
  );
};

export default FullLayout;
