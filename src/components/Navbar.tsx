import React, {FC} from 'react';
import {Layout, Menu, Row} from 'antd';
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {logout} from "../store/reducers/auth/actionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

const Navbar: FC = () => {
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const {isAuth, user} = useAppSelector(state => state.authReducer)
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
                            <Menu.Item onClick={() => dispatch(logout())} key={1}>Выйти</Menu.Item>
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