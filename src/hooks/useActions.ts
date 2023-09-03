import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActionCreator } from '../store/reducers/all-actions-creator';

//простой хук с помощью которого можно к готовым экшн креаторам забиндить диспач
//внутри этого хука мы поулчаем диспач с помощью useDispatch
//и по итогу из этого хука необохдимо вернуть экшн креаторы, которым прибинден уже этот диспач
//для этого прндназначена функция bindActionCreators
//первым арументом эта функция ожидает экшены, а вторым диспач
export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreator, dispatch);
};