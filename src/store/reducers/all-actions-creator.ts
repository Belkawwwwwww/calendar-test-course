import { AuthActionCreators } from './auth/action-creators';
import {EventActionCreators} from "./event/action-creators";

//Отсюда будем экспортировать просто некоторый обожающий объект и в этот объект будем разворачивать
// уже те экшн креаторы, которые на данный момент уже созданы
export const allActionCreator = {
    ...AuthActionCreators,
    ...EventActionCreators
};