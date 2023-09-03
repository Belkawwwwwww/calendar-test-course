import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Dayjs} from "dayjs";
import {formatDate} from "../utils/date";

//пропсы которые этот кмопнент будет ожидать

//берем код из ant designer
//- Сразу же укажем эту переменную для соответствующего пропса, т е для ячеек конкретной даты будет отрабатывать эта функция
//- Преобразуем дату к тому формату с которым хотим работать
//     - Для этого есть соответствующая функция, куда мы передаем этот value и преобразовываем его к типу date
// - Теперь необходимо пробежаться по нашему массиву с событиями
// - И убедиться в том, что там есть объект с такой датой
// - Иопльзуем не функцию find, а функцию filter поскольку на одну дату может быть несколько событий
//- И нам нужно получить не конкретное событие, а массив этих событий и отрисовать сразу все
//- Теперь переходим к JSX
// - Мы по этому массиву с помощью функции map интерируемся
// - И на каждой итерации отрисовывать блок див и туда выводить описание этого события, т е поле description
// - Также поскольку мы итериуемся по списку укажем ключ, в качестве ключа (в качестве ключа мы указать ничего не можем поскольку ни одно поле не является уникальным)
// - Поэтому при итерации мы просто получим индекс и используем его
// - Здесь так сделать можно поскольку удаление события не подразумевается
//


interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    const cellRender = (value: Dayjs) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)

        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    };
    return (
        <Calendar
            cellRender={cellRender}
        />
    );
};

export default EventCalendar;