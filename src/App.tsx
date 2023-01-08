import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import './App.css';
import {IUser} from "./models/IUser";
import {authSlice} from "./store/reducers/auth/authSlice";
import {useAppDispatch} from "./hooks/redux";

const App: FC = () => {
    const {setAuth, setUser} = authSlice.actions;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (localStorage.getItem('auth')){
            dispatch(setAuth(true));
            dispatch(setUser({'username': localStorage.getItem('username') || ''} as IUser));
        }
    }, [])
    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
};

export default App;