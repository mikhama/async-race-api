import { WinnerCar } from 'types/types';
import { Component } from '../../templates/components';
import { WinnerElement } from '../winnerElement/winnerElement';

export const enum WinnersListTypes {
  winnersListClass = 'winners-list',
}

export class WinnersList extends Component {
  private winners: WinnerCar[];
  constructor(tagName: string, className: string, winners: WinnerCar[]) {
    super(tagName, className);
    this.winners = winners;
  }

  private buildWinnersList() {
    this.winners.forEach((winner) => {
      const carHTML = new WinnerElement('div', WinnersListTypes.winnersListClass, winner.time, winner.wins);
      this.container.append(carHTML.render());
    });
  }
  render() {
    this.buildWinnersList();
    return this.container;
  }
}
