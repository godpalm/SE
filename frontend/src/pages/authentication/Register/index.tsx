import {
    Button,
    Card,
    Form,
    Input,
    message,
    Flex,
    Row,
    Col,
    DatePicker,
} from "antd";

import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../../services/https";
import logo from "../../../assets/logo.jpg";

function SignUpPages() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        let res = await CreateUser(values);

        if (res.status === 201) {
            messageApi.open({
                type: "success",
                content: res.data.message,
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: res.data.error,
            });
        }
    };

    return (
        <>
            {contextHolder}

            <Flex justify="center" align="center" className="login">
                <Card className="card-login" style={{ width: 600 }}>
                    <Row align={"middle"} justify={"center"}>
                        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                            <img alt="logo" src={logo} className="images-logo" />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2 className="header">Sign Up</h2>

                            <Form
                                name="basic"
                                layout="vertical"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Row gutter={[16, 0]} align={"middle"}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter your first name!",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter your last name!",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "Invalid email format!",
                                                },
                                                {
                                                    required: true,
                                                    message: "Please enter your email!",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter your password!",
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phone_number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter your phone number!",
                                                },
                                                {
                                                    pattern: /^\d{10}$/,
                                                    message: "Phone number must be 10 digits!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                maxLength={10} // จำกัดความยาวเป็น 10 ตัวอักษร
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    if (!/^\d*$/.test(value)) {
                                                        e.target.value = value.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>


                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label="Birth Day"
                                            name="birthday"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select your birth date!",
                                                },
                                            ]}
                                        >
                                            <DatePicker style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="login-form-button"
                                                style={{ marginBottom: 20 }}
                                            >
                                                Sign up
                                            </Button>
                                            Or <a onClick={() => navigate("/")}>signin now!</a>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </>
    );
}

export default SignUpPages;
