import { parseError } from '../modules/client';
import { handleActions } from '../modules/util';

import { ProductActionType } from '../types/product';
import { STATUS } from '../types/status';

export const productInitState = {
    products: {
        data: [],
        status: STATUS.IDLE,
        message: '',
        query: '',
    }
}

export default {
    product: handleActions({
        [ProductActionType.FETCH_PRODUCT]: (draft, { payload }) => {
            draft.products.data = draft.products.data[payload.query] ?
                draft.products.data[payload.query] : [];
            draft.products.message = '';
            draft.products.query = payload.query;
            draft.products.status = STATUS.RUNNING;

        },
        [ProductActionType.FETCH_PRODUCT_SUCCESS]: (draft, { payload }) => {
            draft.products.data = payload.data || [];
            draft.products.status = STATUS.SUCCESS;
        },
        [ProductActionType.FETCH_PRODUCT_FAILED]: (draft, { payload }) => {
            draft.products.message = parseError(payload.message);
            draft.products.status = STATUS.ERROR;
        }
    }, productInitState)
}