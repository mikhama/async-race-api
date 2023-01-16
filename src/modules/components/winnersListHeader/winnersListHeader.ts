import { Component } from '../../templates/components';
import { Button } from '../button/button';
import './winnersListHeader.css';

export const enum WinnersListHeaderTypes {
  winnersListHeader = 'winners-list-header',
  winnersHeaderButton = 'winners-list-header__button',
}

export class WinnersListHeader extends Component {
  private resetByWins: () => void;
  private resetByTime: () => void;

  constructor(tagName: string, className: string, resetByWins: () => void, resetByTime: () => void) {
    super(tagName, className);
    this.resetByWins = resetByWins;
    this.resetByTime = resetByTime;
  }

  private buildWinnersListHeader() {
    const number = new Button('div', WinnersListHeaderTypes.winnersHeaderButton, 'Number', true);
    const car = new Button('div', WinnersListHeaderTypes.winnersHeaderButton, 'Car', true);
    const name = new Button('div', WinnersListHeaderTypes.winnersHeaderButton, 'Name', true);
    const wins = new Button('div', WinnersListHeaderTypes.winnersHeaderButton, 'Wins');
    const time = new Button('div', WinnersListHeaderTypes.winnersHeaderButton, 'Best time (seconds)');

    wins.onClick(this.resetByWins);
    time.onClick(this.resetByTime);

    this.container.append(number.render());
    this.container.append(name.render());
    this.container.append(car.render());
    this.container.append(wins.render());
    this.container.append(time.render());
  }

  render() {
    this.buildWinnersListHeader();
    return this.container;
  }
}
