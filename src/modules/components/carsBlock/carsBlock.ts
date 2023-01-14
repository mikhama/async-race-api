import { storage } from '../../storage/storage';
import { API } from '../../api/api';
import { Component } from '../../templates/components';
import { CarsList } from '../carsList/carsList';
import { Button } from '../button/button';
import { Events } from 'src/modules/events/events';

export const enum CarBlockTypes {
  CarBlockType = 'cars-list',
  LimitType = '7',
  PrevButtonType = 'prev-button',
  NextButtonType = 'next-button',
}

export class CarBlock extends Component {
  private CarsList: CarsList;
  private total: string | null;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockType, []);
    this.total = null;

    addEventListener(Events.updatePage, () => {
      this.container.innerHTML = '';
      this.buildCarsList();
    });
  }

  private buildHeader() {
    const header = document.createElement('h1');
    header.innerText = `Garage (${this.total ? this.total : '0'})`;
    const counter = document.createElement('h2');
    counter.innerText = `Page: ${storage.getPage()}`;
    this.container.append(header);
    this.container.append(counter);
  }

  private buildCarsList = async () => {
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

    const prevButton = new Button('button', CarBlockTypes.PrevButtonType, 'Prev');
    prevButton.onClick(() => {
      const page = storage.getPage();
      if (page && page !== '1') {
        storage.setPage((+page - 1).toString());
        this.container.innerHTML = '';
        this.buildCarsList();
      }
    });

    const nextButton = new Button('button', CarBlockTypes.NextButtonType, 'Next');
    nextButton.onClick(() => {
      const page = storage.getPage();
      const condition = page && +page * +CarBlockTypes.LimitType < Number(this.total);
      if (condition) {
        storage.setPage((+page + 1).toString());
        this.container.innerHTML = '';
        this.buildCarsList();
      }
    });

    pagination.append(prevButton.render());
    pagination.append(nextButton.render());
    this.container.append(pagination);
  };

  render() {
    this.buildCarsList();
    // this.container.append(this.CarsList.render());
    return this.container;
  }
}
