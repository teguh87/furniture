import { all, fork } from 'redux-saga/effects';

import product from './product';

/**
 * rootSaga
 */

export default function* root() {
    yield all([
        fork(product)
    ])
}