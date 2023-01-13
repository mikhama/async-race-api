import { Car } from 'types/types';
import { Component } from '../../templates/components';
import { CarElement } from '../carElement/carElement';

export const enum CarsListTypes {
  CarsListType = 'cars-element',
}

export class CarsList extends Component {
  private cars: Car[];
  constructor(tagName: string, className: string, cars: Car[]) {
    super(tagName, className);
    this.cars = cars;
  }
  private renderCars() {
    this.cars.forEach((car) => {
      const carHTML = new CarElement('div', CarsListTypes.CarsListType, car.name, car.color);
      this.container.append(carHTML.render());
    });
  }
  render() {
    this.renderCars();
    return this.container;
  }
}
