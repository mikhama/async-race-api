import { Car } from '../../../types/types';
import { BRANDS, MODELS } from './constants';

const selectRandomElement = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const getRandomCar = (): Car => {
  return {
    name: `${selectRandomElement(BRANDS)} ${selectRandomElement(MODELS)}`,
    color: generateRandomColor(),
  };
};
