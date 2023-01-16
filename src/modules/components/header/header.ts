import { Component } from '../../templates/components';
import { PageTypes } from '../../../pages/app/app';
import { Button } from '../button/button';

const Buttons = [
  { id: PageTypes.garagePage, text: 'GARAGE' },
  { id: PageTypes.winnersPage, text: 'WINNERS' },
];

export const enum HeaderTypes {
  pageButton = 'page-button',
}

export class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonElement = new Button('a', HeaderTypes.pageButton, button.id).render() as HTMLAnchorElement;
      buttonElement.href = `#${button.id}`;
      buttonElement.innerText = button.text;
      pageButtons.append(buttonElement);
    });
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}
