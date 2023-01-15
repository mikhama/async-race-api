import { API } from '../../api/api';
import { Events } from '../../events/events';
import { storage } from '../../storage/storage';
import { ListBlock } from '../../templates/listBlock';
import { WinnersList } from '../winnersList/winnersList';
import { WinnersListHeader } from '../winnersListHeader/winnersListHeader';

export enum WinnersBlockTypes {
  winnersBlockClass = 'winners-list',
  winnersHeaderClass = 'winners-list-header',
  limitType = '10',
}

export class WinnersBlock extends ListBlock {
  private winnersList: WinnersList;
  private total: string;
  private order: string = 'DESC';
  private sortBy: string = 'id';

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.winnersList = new WinnersList('div', WinnersBlockTypes.winnersBlockClass, []);
    this.total = '0';

    addEventListener(Events.updatePage, () => {
      this.container.innerHTML = '';
      this.buildWinnersList();
    });
  }

  private sortByWins = () => {
    this.sortBy = 'wins';
    this.order = this.order === 'DESC' ? 'ASC' : 'DESC';
    this.container.innerHTML = '';
    this.buildWinnersList();
  };

  private sortByTime = () => {
    this.sortBy = 'time';
    this.order = this.order === 'DESC' ? 'ASC' : 'DESC';
    this.container.innerHTML = '';
    this.buildWinnersList();
  };

  private buildWinnersList = async () => {
    const page = storage.getWinnerPage();
    const currentPage = page ? page : '1';

    const { winners, total } = await API.getWinners([
      { key: '_page', value: currentPage },
      { key: '_limit', value: WinnersBlockTypes.limitType },
      { key: '_sort', value: this.sortBy },
      { key: '_order', value: this.order },
    ]);

    this.total = total ? total : this.total;
    this.buildHeader('Garage', this.total, currentPage);

    const winnersListHeader = new WinnersListHeader(
      'div',
      WinnersBlockTypes.winnersHeaderClass,
      this.sortByWins,
      this.sortByTime
    );

    this.container.append(winnersListHeader.render());

    this.winnersList = new WinnersList('div', WinnersBlockTypes.winnersBlockClass, winners);
    this.container.append(this.winnersList.render());

    this.buildPaginationButtons(+WinnersBlockTypes.limitType, +this.total, this.buildWinnersList);
  };

  render() {
    this.buildWinnersList();
    return this.container;
  }
}
