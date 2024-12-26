import React from "react";
import { Breadcrumb, Layout, Menu, theme, message, Dropdown, Avatar } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../../assets/logo.jpg";

// User Pages
import Dashboard from "../../pages/customer/palm/dashboard";
import Customer from "../../pages/customer/palm/customer";
import CustomerCreate from "../../pages/customer/palm/customer/create";
import CustomerEdit from "../../pages/customer/palm/customer/edit";

import UserCodes from "../../pages/customer/palm/code";

const { Header, Content, Footer } = Layout;

const UserLayout: React.FC = () => {
    const page = localStorage.getItem("page");
    const [messageApi, contextHolder] = message.useMessage();

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

    const profileMenu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to="/profile">
                    <UserOutlined />
                    <span>แก้ไขข้อมูลส่วนตัว</span>
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" onClick={Logout}>
                <span style={{ color: "red" }}>ออกจากระบบ</span>
            </Menu.Item>
        </Menu>
    );

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
                            <Menu.Item key="customer" onClick={() => setCurrentPage("customer")}>
                                <Link to="/customer">
                                    <UserOutlined />
                                    <span>ข้อมูลสมาชิก</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="code" onClick={() => setCurrentPage("code")}>
                                <Link to="/code">
                                    <UserOutlined />
                                    <span>collect code</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <Dropdown overlay={profileMenu} placement="bottomRight">
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            style={{ cursor: "pointer" }}
                        />
                    </Dropdown>
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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/customer/create" element={<CustomerCreate />} />
                            <Route path="/customer/edit/:id" element={<CustomerEdit />} />

                            <Route path="/code" element={<UserCodes />} />
                        </Routes>
                    </div>
                </Content>

                <Footer style={{ textAlign: "center" }}>
                    IGOTSOFAR 555
                </Footer>
            </Layout>
        </Layout>
    );
};

export default UserLayout;
