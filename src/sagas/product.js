/**
 * @module saga/Product
 * @description Product
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from '../modules/client';

import { ProductActionType } from '../types/product';

/**
 * fetch Product
 * @param {Object} action 
 */
export function* fetchProduct({ payload }) {
    try {
        const response = yield call(
            request,
            "http://www.mocky.io/v2/5c9105cb330000112b649af8"
        );

        yield put({
            type: ProductActionType.FETCH_PRODUCT_SUCCESS,
            payload: { data: filtered(response.products, payload.query) }
        });
    } catch (error) {
        /* instanbul ignore next */
        yield put({
            type: ProductActionType.FETCH_PRODUCT_FAILED,
            payload: error
        })
    }
}

/**
 * 
 * @param {Array} data 
 * @param {Object} query 
 * 
 * @returns {Array} data
 */
export function filtered(data, query) {
    if (!query) return data;

    let products = data;

    if (query.name && query.name !== '') {
        products = products.filter(product => product.name.toLowerCase().includes(query.name.toLowerCase()));
    }

    if (query.delivery_time && query.delivery_time.length > 0) {
        const deliveries = query.delivery_time;
        let prodByTime = [];
        deliveries.forEach(time => {
            products.forEach(product => {
                const delivery_time = parseInt(product.delivery_time)
                if (time === "1 week") {
                    if (delivery_time <= 7) {
                        prodByTime.push(product)
                    }
                } else if (time === "2 weeks") {
                    if (delivery_time > 7 && delivery_time <= 14) {
                        prodByTime.push(product)
                    }
                } else if (time === "1 month") {
                    if (delivery_time > 14 && delivery_time <= 30) {
                        prodByTime.push(product)
                    }
                } else {
                    if (delivery_time > 30) {
                        prodByTime.push(product)
                    }
                }
            });
        });
        products = [...prodByTime];
    }

    if (query.furniture_style && query.furniture_style.length > 0) {
        const styles = query.furniture_style;

        let styleProducts = [];
        styles.forEach(style => {
            const sps = products.filter(product => product.furniture_style.includes(style))

            sps.forEach(sp => {
                if (styleProducts.length === 0) {
                    styleProducts.push(sp)
                } else {
                    let add = true

                    for (let i = 0; i < styleProducts.length; i++) {
                        if (sp.name === styleProducts[i].name) {
                            add = false
                            break
                        }
                    }

                    if (add)
                        styleProducts.push(sp)
                }
            })
        });
        products = [...styleProducts];
    }

    return products;
}

/**
 *  Adding root on product saga
 */
export default function* root() {
    yield all([takeLatest(ProductActionType.FETCH_PRODUCT, fetchProduct)])
}