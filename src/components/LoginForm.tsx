import React, {FC} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useActions} from "../hooks/useActions";
import {IUser} from "../models/IUser";

const LoginForm: FC = () => {
    const {login} = useActions();
    const {error, isLoading} = useSelector((state: RootState) => state.authReducer);
    const onFinish = (user: IUser) => {
        login(user.username, user.password);
    };

    return (
        <Form onFinish={onFinish}>
            {error && <div style={{color: '#FF0000'}}>
                {error}
            </div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Пожалуйста введите имя пользователя!')]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста введите пароль!')]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>

    );
};

export default LoginForm;