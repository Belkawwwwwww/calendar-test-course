import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUsers";

//воспользуемся здесь хуком useEffect с пустым массивом зависимостей
//Для того, чтобы колбек, который мы в этот хук передаем отработал лишь единожды при первом запуске приложения
//А внутри самого колбэка мы сделаем простую проверку, если в localStorage по ключу auth что-то находится,
// то тогда пользователя будем логинить, в обратном случае можно ничего не делать потому что мы и так попадаем на страницу с логином
//Для этого нам понадобится получить пару экшн креаторов это setUsers и setIsAuth
// Внутри условия просто вызываем два этих экшн креатора
// Нам необходимо в первый передать объект пользователя, но он у нас не полный, у нас только есть username который мы также получаем из localStorage
//Это все имитация
//Если бы мы работали с реальным сервером, то здесь мы отправляли какой-то Толкин на проверку и в зависимчсоит от этого устанавливали нужные значения в наше состояние
//Также вызываем второй экшн Креатор и здесь просто передаем значение тру
const App: FC = () => {
    const {setUser, setIsAuth} = useActions()

    useEffect(() => {
        if(localStorage.getItem('auth')){
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true);
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