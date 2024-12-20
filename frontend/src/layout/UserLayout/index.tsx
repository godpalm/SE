import React from "react";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../../assets/logo.jpg";

// User Pages
import Dashboard from "../../pages/customer/palm/dashboard";
import Customer from "../../pages/customer/palm/customer";
import CustomerCreate from "../../pages/customer/palm/customer/create";
import CustomerEdit from "../../pages/customer/palm/customer/edit";

const { Header, Content, Footer } = Layout;

const UserLayout: React.FC = () => {

    const page = localStorage.getItem("page");
    const [messageApi, contextHolder] = message.useMessage();
    // const [collapsed, setCollapsed] = useState(false);

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
                            <Menu.Item key="customer" onClick={() => setCurrentPage("customer")}>
                                <Link to="/customer">
                                    <UserOutlined />
                                    <span>ข้อมูลสมาชิก</span>
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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/customer/create" element={<CustomerCreate />} />
                            <Route path="/customer/edit/:id" element={<CustomerEdit />} />
                        </Routes>
                    </div>
                </Content>

                <Footer style={{ textAlign: "center" }}>
                    System Analysis and Design 1/67
                </Footer>
            </Layout>
        </Layout>
    );
};

export default UserLayout;
