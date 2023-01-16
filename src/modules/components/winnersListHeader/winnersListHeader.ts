import { TagNames } from '../../utils/constants';
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

  private buttonNames = {
    number: 'Number',
    car: 'Car',
    name: 'Name',
    wins: 'Wins',
    time: 'Best time (seconds)',
  };

  constructor(tagName: string, className: string, resetByWins: () => void, resetByTime: () => void) {
    super(tagName, className);
    this.resetByWins = resetByWins;
    this.resetByTime = resetByTime;
  }

  private buildWinnersListHeader() {
    const number = new Button(TagNames.DIV, WinnersListHeaderTypes.winnersHeaderButton, this.buttonNames.number, true);
    const car = new Button(TagNames.DIV, WinnersListHeaderTypes.winnersHeaderButton, this.buttonNames.car, true);
    const name = new Button(TagNames.DIV, WinnersListHeaderTypes.winnersHeaderButton, this.buttonNames.name, true);
    const wins = new Button(TagNames.DIV, WinnersListHeaderTypes.winnersHeaderButton, this.buttonNames.wins);
    const time = new Button(TagNames.DIV, WinnersListHeaderTypes.winnersHeaderButton, this.buttonNames.time);

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
