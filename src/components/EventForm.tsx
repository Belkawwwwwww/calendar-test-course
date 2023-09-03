import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import FormItem from "antd/es/form/FormItem";
import {IUser} from "../models/IUsers";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";
import {Dayjs} from "dayjs";
import {useTypedSelector} from "../hooks/useTypedSelector";


//внутрь селекта, внутрь выпадающего списка помещаем список пользователей
//для этого необходимо опредлеить какие пропсы принимает компонент
//и как раз этот компонент eventForm будет принимать в себя список гостей
//Т е в данном случае мы не получаем гостей из состояния, мы принимаем их пропсом для того чтобы эту форму можно было переиспользовать
//И возможно в каком-то другом месте приложения у нас был другой список пользователей
//итерируемся с помощью функции map по списку гостей
//Для каждого гостя будем обрисовывать свою опцию
//В качестве value передаем username гостя
//И как текст самой опции укажем username
//Подразумевается что username уникальный, поэтому можем его использовать в качестве value
//- И сразу сделаем нашу форму управляемой реализуем onChange  и передадим value в соотвествующие элементы формы
//- Для начала создадим состояние в кот будет хранить информацию о событии, которое мы будем создавать
// - Сам объект называем event
// - Функция, кот будет изменять состояние setEvent
// - Сразу типизируем useState, укажем какого типа будет находится объект внутри
// - И сразу по дефолту проинициализируем
// - В объекте сразу объявляем какие будут поля и чему по умолчанию они будут равняться
// - Для того, чтобы в дальнейшем св]язывать с инпутами, формами и т д
// - Поэтому каждое поле проинициализируем пустой строкой
//- Теперь реализуем слушатель onChange на селекте
// - Внутрь слушателя передаем стрелочную функцию, которая параметром будет принимать выбранного гостя,
// - Затем мы вызываем функцию setEvent для изменения состояния туда передаем старый event и заменяем у него поле guest
// - Для того чтобы TS не ругался укажем, что мы ожидаем строку в данном случае
// - Остается сделать упраавляемым datepicker и описание события
// - Начнем с input
//В качестве value передаем description
//И сразу же реализовавшем onChange, в котором изменяем такие соответствующее поле состояния
//Это поле description, кот забираем из event target value
// - C datepicker работаем иначе, в качестве value datapicker возвращает moment, это библиотека, которую внутри себя использует antdesigner
// - Реалзиовываем onChange
//     - Будем вызывать функцию selectDate
//     - И создаем эту функцию
//- Это будет обычная стрелочная функция
//Параметрами она будет принимать выбранную дату типа moment
//     - И выводим эту дату в консоль
//отформатируем дату при помощи созданной функции
// - Но для этого объект типа moment преобразовать к объекту типа date
// - Но поскольку в качестве date нам может вернуться null, необходимо сделать проверку, и внутри этой проверки делать соотвествующие преобразования
//- еперь остается эту отформатированную дату поместить в состояние
// - console.log убираем вызываем функцию setEvent туда передаем объект в него разворачиваем старый event и перезаписываем у него поле date туда мы передаем отформатированную дату
//- Со всеми элементами формы мы разобрались теперь необходимо обработать submit этой формы в antdesigner
// - Слушатель называется onFinish
// - А функция, которая при этом событии будет вызываться назовем - submitForm
//- Пока что выведем в логи сам event, чтобы убедиться что там находятся все поля, которые нам нужны
// - Получаем пустое поле author,
// - Туда необходимо добавлять того пользователя, который на текущий момент залогинен
// - Эту информацию можем получить из нашего состояния, состояния auth и там храним самого пользователя
//- И соотвественно username этого пользователя при submitForm можно получать
//Чтобы не изменять исходное состояние, будем изменять новый объект, в него разворачивать event и у него перезаписывать поле author,
//а автора получаем из пользователя кот мы достали из состояния
//- Но Поскольку форма своего рода переиспользуема, определять логику sumbit будем на компонент выше, т е компонент который внутри себя ее использует
// - Определяем такой пропс - submit
//Это будет обычная функция, кот ничего не возращает, но аргументом принимает event
//- Таким образом с помощью колбэка мы будем отдавать созданный эвент на уровень выше
// - Соотвественно вызываем этот колбек, туда разворачиваем event и перезаписываем у него поле author
//

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent]= useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <FormItem
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Нельзя создать событие в прошлом")]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </FormItem>
            <FormItem
                label="Выберите гостя"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </FormItem>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>

        </Form>
    );
};

export default EventForm;