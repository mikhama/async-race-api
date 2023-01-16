import { getWinnersParams } from '../../api/queryParams';
import { TagNames } from '../../utils/constants';
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
  private total: string = '0';
  private order: string = 'DESC';
  private sortBy: string = 'id';

  private ORDERS_AND_SORTS = {
    ASC: 'ASC',
    DESC: 'DESC',
    WINS: 'wins',
    TIME: 'time',
  };

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.winnersList = new WinnersList(TagNames.DIV, WinnersBlockTypes.winnersBlockClass, []);

    addEventListener(Events.updatePage, () => {
      this.container.innerHTML = '';
      this.buildWinnersList();
    });
  }

  private setSortBy(sort: string) {
    const { DESC, ASC } = this.ORDERS_AND_SORTS;
    this.sortBy = sort;
    this.order = this.order === DESC ? ASC : DESC;
    this.container.innerHTML = '';
    this.buildWinnersList();
  }

  private buildWinnersList = async () => {
    const page = storage.getWinnerPage();
    const currentPage = page ? page : '1';

    const { winners, total } = await API.getWinners(
      getWinnersParams(+currentPage, +WinnersBlockTypes.limitType, this.order, this.sortBy)
    );

    this.total = total ? total : this.total;
    const winnersText = 'Winners';
    this.buildHeader(winnersText, this.total, currentPage);

    const winnersListHeader = new WinnersListHeader(
      TagNames.DIV,
      WinnersBlockTypes.winnersHeaderClass,
      () => this.setSortBy(this.ORDERS_AND_SORTS.WINS),
      () => this.setSortBy(this.ORDERS_AND_SORTS.TIME)
    );

    this.container.append(winnersListHeader.render());

    this.winnersList = new WinnersList(TagNames.DIV, WinnersBlockTypes.winnersBlockClass, winners);
    this.container.append(this.winnersList.render());

    const maxPage = Math.ceil(Number(this.total) / Number(WinnersBlockTypes.limitType));
    const minPage = 1;

    let isPrevDisabled = page ? +page === minPage : true;
    let isNextDisabled = page ? +page === maxPage : false;

    const prevClick = () => {
      const page = storage.getWinnerPage();
      if (page && +page === minPage) isPrevDisabled = true;
      if (page && page !== '1') {
        storage.setWinnerPage((+page - 1).toString());
        this.container.innerHTML = '';
        this.buildWinnersList();
      }
    };

    const nextClick = () => {
      const page = storage.getWinnerPage();
      if (page && +page === maxPage) isNextDisabled = true;
      const condition = page && +page * +WinnersBlockTypes.limitType < Number(total);
      if (condition) {
        storage.setWinnerPage((+page + 1).toString());
        this.container.innerHTML = '';
        this.buildWinnersList();
      }
    };

    this.buildPaginationButtons(isPrevDisabled, isNextDisabled, prevClick, nextClick);
  };

  render() {
    this.buildWinnersList();
    return this.container;
  }
}
