import { Component } from '../../templates/components';
import { PageIds } from '../../../pages/app/app';

const Buttons = [
  { id: PageIds.GaragePage, text: 'To Garage' },
  { id: PageIds.WinnersPage, text: 'To Winners' },
];

export class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonElement = document.createElement('a');
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
