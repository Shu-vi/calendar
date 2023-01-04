import React, {FC} from 'react';
import {Layout, Menu, Row} from 'antd';
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const router = useNavigate();
    const {logout} = useActions();
    const {isAuth, user} = useSelector((state: RootState) => state.authReducer)
    return (
        <Layout.Header>
            <Row justify="end">
                {
                    isAuth
                        ?
                        <Menu theme='dark' mode='horizontal' selectable={false}>
                            <div style={{color: 'white'}}>
                                {user.username}
                            </div>
                            <Menu.Item onClick={logout} key={1}>Выйти</Menu.Item>
                        </Menu>
                        :
                        <Menu theme='dark' mode='horizontal' selectable={false}>
                            <Menu.Item onClick={() => router(RouteNames.LOGIN)} key={1}>Логин</Menu.Item>
                        </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;