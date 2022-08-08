import {getCars} from './api.js';

const {items: cars, count: carsCount} = await getCars(1);

export default{
    carsPage: 1,
    cars, carsCount,
    animation: {},
    view: 'garage',
    sortBy: null,
    soryOrder: null,
}