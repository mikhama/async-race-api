import { Button } from '../components/button/button';
import { storage } from '../storage/storage';
import { Component } from './components';

export const enum ListBlockTypes {
  prevButtonType = 'prev-button',
  nextButtonType = 'next-button',
}

export class ListBlock extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  protected buildHeader(name: string, total: string, page: string) {
    const header = document.createElement('h1');
    header.innerText = `${name} (${total})`;
    const counter = document.createElement('h2');
    counter.innerText = `Page #${page}`;
    this.container.append(header);
    this.container.append(counter);
  }

  protected buildPaginationButtons = (limit: number, total: number, build: () => void) => {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    const prevButton = new Button('button', ListBlockTypes.prevButtonType, 'Prev');
    prevButton.onClick(() => {
      const page = storage.getCarPage();
      if (page && page !== '1') {
        storage.setCarPage((+page - 1).toString());
        this.container.innerHTML = '';
        build();
      }
    });

    const nextButton = new Button('button', ListBlockTypes.nextButtonType, 'Next');
    nextButton.onClick(() => {
      const page = storage.getCarPage();
      const condition = page && +page * limit < Number(total);
      if (condition) {
        storage.setCarPage((+page + 1).toString());
        this.container.innerHTML = '';
        build();
      }
    });

    pagination.append(prevButton.render());
    pagination.append(nextButton.render());
    this.container.append(pagination);
  };

  render() {
    return this.container;
  }
}
