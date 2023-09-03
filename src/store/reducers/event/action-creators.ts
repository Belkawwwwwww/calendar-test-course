import {IUser} from "../../../models/IUsers";
import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./type";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

//По аналогичной схеме сделаем объект и функцией внутри этого объекта будут являться экшен креаторами
//Создаем этот объект и сразу его из этого файла экспортируем
//Внутри объекта создаем две функции
//Одна будет возвращать экшен креатор для того, чтобы поместить в состояние гостей
//А вторая для эвента
//Здесь все делаем по аналогии с auth редюсером
//Также сразу сделаем асинхронный экшен с помощью которого мы будем получать пользователей из файла
//Называем его fetschGuests
//Асинхронный экшен должен возвращать еще одну функцию, которая аргументом принимает диспач
//Обернем все в блок tru catch, чтобы обработать потенциально возможные ошибки
//В случае, если ошибка произошла то выведем ее просто в логи
//Следующим этапом необходимо сделать запрос и получить пользователей
//Соотвественно axios get запрос и обращаемся к нашему файлу, кот заменяет сервер users.json


//Остается задиспатчить нужный экшн Креатор и передать туда то, что мы получили в response
//- Создадим еще один action creator c помощью которого будем добавлять новый созданный event в глобальное хранилище
//ргументом будем принимать event
//- И здесь логика будет следующая:
// - Оборачиваем в блок try catch
// - Здесь сделаем некоторую имитацию по работе с сервером
// - Поскольку event будем хранить в localeStorage
//     - Во первых мы их от туда получим
//     - Если от туда ничего не вернулось, то будем получать пустой массив
//- В localstorage мы храним данные как строку, необходимо преобразовать их JS объектам
//- После чего в полученный массив необходимо добавить новый созданный event
//     - Поэтому json в нашем случае это массив
//     - Но TS не подхватывает, что это массив, необходимо это явно указать
//         - Указываем что это массив типа IEvent
//             - as IEvent[]
// - Теперь в этот массив мы добавляем новый созданный event
//- После чего этот массив необходимо поместить в состояние, чтобы мы увидели обновление интерфейса и увидели новое созданное событие
// - Вызываем экшн Креатор setEvents и туда передаем массив json
//- После чего массив с новым элементом нам необходимо опять поместить в localStorage чтобы при обновлении страницы вся информация не пропала, опять же  это все логика имитации сервера
//- Но перед тем как поместить массив в localeStorage необходимо запарсить его к строке

//для первичной подгрузки страницы создаем еще один экшн креатор
//- В этом эко креаторе необходимо получить данные из localStorage
// - распарсить их и поместить в состояние
// - Но в localStarage хранятся все данные, а необходимо получать данные только для конкретного пользователя
// - Либо если он является гостем, либо если он является автором того или иного события
//     - Поэтому весь массив мы фильтруем и делаем две проверки
//     - Проверяем является пользователь либо автором либо гостем события
//и оставляем только те условия в массиве, которые удовлетворяют условию
//- После того как мы массив отфильтровали
// - Остается задиспачить соотвествующий экшн Креатор и туда передать отфильтрованный массив
//


export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUEST, payload}),
    setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActionCreators.setGuests(response.data));
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e) {
            
        }
    }
}