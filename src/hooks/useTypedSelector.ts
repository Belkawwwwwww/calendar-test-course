import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../store'

//экспортируем сюда константу и сразу задаем ей тип
//это спрециальный тип который предоставляет редакс
//в качесвте дженерика указываем тот тип который отвечает за состояние приложения из /store/index.ts - RootState
//и приравниваем его к UseState
//

/*
export const useAppDispatch = () => useDispatch<AppDispatch>()
*/
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector //типизируем useSelector
