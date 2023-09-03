import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActionCreator } from '../store/reducers/all-actions-creator';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreator, dispatch);
};
