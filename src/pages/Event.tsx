import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {createEvent} from "@testing-library/react";
import {IEvent} from "../models/IEvent";


//под компонентом row добавляем компонент modal
//сразу же добавляем необходимые пропсы - заголовок модального окна, также необходимо регулировать на уровне
//пропсов видимость этого модального окна, за это отвечает пропс visible
//поэтому создаем состояние и инициализируем его с помощь useState
//и это состояние передаем как пропс в модальное окно
//обрабатываем также закрытие модального окна onCancel

//в eventform передаем соотвествубщий пропс - это список гостей
//И этот список с помощью хука useTypedSelector мы получаем из нашего состояния
//Сразу делаем диструктцризацию, обращаемся к редюсеру event и получаем от туда поле guests


//Теперь необходимо передать колбек в EventForm и здесь будем вызывать этот экшн Креатор
// - Сначала при помощи useActions мы его получаем
//- И здесь передаем стрелочную функцию, вызываем этот экшн Креатор и аргументом туда передаем event
//- Теперь чтобы убедиться что состояние обновляется, что туда действительно добавляется новый элемент
// - Получим эти events из состояния и просто выведем их в шаблон, перед этим предварительно преобразовав к строке
//- Нет некоторой первичной загрузки событий из localstarage
// - Пока что мы их только создаем
// - И также хотелось бы, чтобы после создания события закрывалось модальное окно
// - Поэтому создадим отдельную функцию
//     - Во первых скроем модальное окно
//- А во вторых необходимо создать само событие
// - Передаем соотвествующий колбек, который принимает параментром event
// - И вызываем соответствующий экшн Креатор
//- Теперь вызываем и fetchEvents
// - Получаем его и вызываем внутри колбэка  useEffect
//- И сюда необходимо передать имя пользователя, его мы можем получить из состояния
// - Это уже будет сосоятоние, кот мы забираем из редюсера auth и нас интересует сам пользователь
//- И у этого пользователя достаем username

//отрисовка в самом календаре : передаем events в сам компонент eventCalendar

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests,events} = useTypedSelector(state => state.event);
    const {user} = useTypedSelector(state => state.auth);

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button
                    onClick={() => setModalVisible(true)}
                >
                    Добавить событие
                </Button>
            </Row>
            <Modal
                title="Добавить событие"
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;