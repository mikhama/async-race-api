import { QueryParams } from 'types/types';

const getCarEngineParams = (id: string, status: string) => [
  { key: 'id', value: id },
  { key: 'status', value: status },
];

export const getCarEngineStartParams = (id: string): QueryParams[] => getCarEngineParams(id, 'started');

export const getCarEngineStopParams = (id: string): QueryParams[] => getCarEngineParams(id, 'stopped');

export const getSwitchEngineParams = (id: string): QueryParams[] => getCarEngineParams(id, 'drive');

export const getCarsParams = (page: number, limit: number): QueryParams[] => [
  { key: '_page', value: page },
  { key: '_limit', value: limit },
];

export const getWinnersParams = (page: number, limit: number, order: string, sort: string): QueryParams[] => [
  { key: '_page', value: page },
  { key: '_limit', value: limit },
  { key: '_sort', value: sort },
  { key: '_order', value: order },
];
