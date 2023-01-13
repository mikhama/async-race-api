import { API } from '../../api/api';
import { Component } from '../../templates/components';
import { CarsList } from '../carsList/carsList';

export const enum CarBlockTypes {
  CarBlockType = 'cars-list',
}

export class CarBlock extends Component {
  private CarsList: CarsList;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockType, []);
  }
  private buildHeader() {
    const header = document.createElement('h1');
    header.innerText = 'Cars';
    this.container.append(header);
  }

  private buildCars = async () => {
    // Предел на количество машин в гараже будет лежать в локальном хранилище
    const { cars } = await API.getCars([
      { key: '_page', value: '1' },
      { key: '_limit', value: '7' },
    ]);
    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockType, cars);
    this.container.append(this.CarsList.render());
  };

  render() {
    this.buildHeader();
    this.buildCars();
    // this.container.append(this.CarsList.render());
    return this.container;
  }
}
