import { createActions } from 'redux-actions';
import { ProductActionType } from '../types/product';

export const { fetchProduct: fetchProductList } = createActions({
    [ProductActionType.FETCH_PRODUCT]: (query) => ({ query }),
})