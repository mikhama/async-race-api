import { Button } from '../components/button/button';
import { TagNames } from '../utils/constants';
import { Component } from './components';

export const enum ListBlockTypes {
  prevButtonType = 'prev-button',
  nextButtonType = 'next-button',
  pagination = 'pagination',
}

export class ListBlock extends Component {
  private buttonNames = {
    prev: 'PREV',
    next: 'NEXT',
  };

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  protected buildHeader(name: string, total: string, page: string) {
    const header = document.createElement(TagNames.H1);
    header.innerText = `${name} (${total})`;
    const counter = document.createElement(TagNames.H2);
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
    const pagination = document.createElement(TagNames.DIV);
    pagination.classList.add(ListBlockTypes.pagination);

    const prevButton = new Button(
      TagNames.BUTTON,
      ListBlockTypes.prevButtonType,
      this.buttonNames.prev,
      isPrevDisabled
    );
    prevButton.onClick(prevClick);

    const nextButton = new Button(
      TagNames.BUTTON,
      ListBlockTypes.nextButtonType,
      this.buttonNames.next,
      isNextDisabled
    );
    nextButton.onClick(nextClick);

    pagination.append(prevButton.render());
    pagination.append(nextButton.render());
    this.container.append(pagination);
  };

  render() {
    return this.container;
  }
}
