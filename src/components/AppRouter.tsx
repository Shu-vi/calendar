import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useAppSelector} from "../hooks/redux";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    return (
        isAuth
            ?
            <Routes>
                {
                    privateRoutes.map(r => {
                        return (<Route key={r.path} path={r.path} element={r.component}/>);
                    })
                }
                <Route path={RouteNames.ANY} element={<Navigate replace={true} to={'/'}/>}/>
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(r => {
                        return (<Route key={r.path} path={r.path} element={r.component}/>);
                    })
                }
                <Route path={RouteNames.ANY} element={<Navigate replace={true} to={'/login'}/>}/>
            </Routes>
    );
};
export default AppRouter;