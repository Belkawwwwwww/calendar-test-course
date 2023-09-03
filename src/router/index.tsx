import React from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";


export interface IRoute {
    path: string;
    element: React.ReactElement;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: <Login/>},
    {path: '*', element: <Login/>},
    {path: '/', element: <Login/>}
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, element: <Event/>},
];
