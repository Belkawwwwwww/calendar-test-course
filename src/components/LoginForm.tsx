import React, {FC, useCallback, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AppDispatch} from "../store";
import {useActions} from "../hooks/useActions";


//из ant designer копируем форму
//есть массив rules с некоторыми настройками
//этот пропс предназначен для валидации
//мы можем передавать туда несколько объектов по которым будем валидировать тот или иной инпут
//в данном случае required показывает что наличие какого-то текста внутри этого инпута обязательно
//добавляем слушатель события onFinish, submit - функция, которая на этот слушатель будет отрабатывать
//создаем ее выше в кмопоненте

//сделаем вывод ошибки в форму и обработаем индикацию загрузки
//используем useTypedSelector достаем редюсер auth, поле error и isLoading

const LoginForm: FC = () => {

    const {login} = useActions();
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        login(username, password)
    }

    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Пожалуйста введите имя пользователя!')]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста введите пароль!')]}
            >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={"password"}
                />
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