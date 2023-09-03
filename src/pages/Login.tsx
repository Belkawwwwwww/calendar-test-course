import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import LoginForm from "../components/LoginForm";

//в корень помещаем Layout поскольку эо будет страница


const Login: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card>
                    <LoginForm/>
                </Card>

            </Row>
        </Layout>
    );
};

export default Login;