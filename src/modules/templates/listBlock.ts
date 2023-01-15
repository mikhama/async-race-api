import { Button } from '../components/button/button';
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

  protected buildPaginationButtons = (
    isPrevDisabled: boolean,
    isNextDisabled: boolean,
    prevClick: () => void,
    nextClick: () => void
  ) => {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    const prevButton = new Button('button', ListBlockTypes.prevButtonType, 'PREV', isPrevDisabled);
    prevButton.onClick(prevClick);

    const nextButton = new Button('button', ListBlockTypes.nextButtonType, 'NEXT', isNextDisabled);
    nextButton.onClick(nextClick);

    pagination.append(prevButton.render());
    pagination.append(nextButton.render());
    this.container.append(pagination);
  };

  render() {
    return this.container;
  }
}
