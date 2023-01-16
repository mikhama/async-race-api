import { API } from '../../api/api';
import { WinnerCar } from 'types/types';
import { Component } from '../../templates/components';
import { WinnerElement, WinnerElementTypes } from '../winnerElement/winnerElement';
import { TagNames } from 'src/modules/utils/constants';

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
    this.winners.forEach(async (winner) => {
      const car = await API.getCar(winner.id || 0);
      const carHTML = new WinnerElement(
        TagNames.DIV,
        WinnerElementTypes.winnerElementClass,
        winner.time,
        winner.wins,
        car.name,
        car.color,
        winner.id || 0
      );
      this.container.append(carHTML.render());
    });
  }
  render() {
    this.buildWinnersList();
    return this.container;
  }
}
