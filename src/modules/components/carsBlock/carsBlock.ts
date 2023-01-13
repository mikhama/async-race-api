import { storage } from '../../storage/storage';
import { API } from '../../api/api';
import { Component } from '../../templates/components';
import { CarsList } from '../carsList/carsList';
import { Button } from '../button/button';

export const enum CarBlockTypes {
  CarBlockType = 'cars-list',
  LimitType = '7',
}

export class CarBlock extends Component {
  private CarsList: CarsList;
  private total: string | null;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockType, []);
    this.total = null;
  }

  private buildHeader() {
    const header = document.createElement('h1');
    header.innerText = `Garage (${this.total ? this.total : '0'})`;
    this.container.append(header);
  }

  private buildCars = async () => {
    // Предел на количество машин в гараже будет лежать в локальном хранилище
    const page = storage.getPage();

    const { cars, total } = await API.getCars([
      { key: '_page', value: page ? page : '1' },
      { key: '_limit', value: CarBlockTypes.LimitType },
    ]);

    this.total = total;
    this.buildHeader();

    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockType, cars);
    this.container.append(this.CarsList.render());
    this.buildPaginationButtons();
  };

  private buildPaginationButtons = () => {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    const prevButton = new Button('button', 'prev', 'Prev');
    prevButton.onClick(() => {
      const page = storage.getPage();
      if (page && page !== '1') {
        storage.setPage((+page - 1).toString());
        this.container.innerHTML = '';
        this.buildCars();
      }
    });

    const nextButton = new Button('button', 'next', 'Next');
    nextButton.onClick(() => {
      const page = storage.getPage();
      const condition = page && +page * +CarBlockTypes.LimitType < Number(this.total);
      if (condition) {
        storage.setPage((+page + 1).toString());
        this.container.innerHTML = '';
        this.buildCars();
      }
    });

    pagination.append(prevButton.render());
    pagination.append(nextButton.render());
    this.container.append(pagination);
  };

  render() {
    this.buildCars();
    // this.container.append(this.CarsList.render());
    return this.container;
  }
}
