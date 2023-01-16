import { storage } from '../../storage/storage';
import { API } from '../../api/api';
import { CarsList } from '../carsList/carsList';
import { Events } from '../../events/events';
import { ListBlock } from '../../templates/listBlock';
import './carsBlock.css';
import { TagNames } from '../../utils/constants';
import { getCarsParams } from '../../api/queryParams';

export const enum CarBlockTypes {
  CarBlockClass = 'cars-list',
  LimitType = '7',
  PrevButtonType = 'prev-button',
  NextButtonType = 'next-button',
}

export class CarBlock extends ListBlock {
  private CarsList: CarsList;
  private total: string;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.CarsList = new CarsList(TagNames.DIV, CarBlockTypes.CarBlockClass, []);
    this.total = '0';

    addEventListener(Events.updatePage, () => {
      const children = this.container.children;
      for (let i = 0; i < children.length; i++) {
        this.container.removeChild(children[i]);
      }
      this.container.innerHTML = '';
      this.buildCarsList();
    });
  }

  private buildCarsList = async () => {
    const page = storage.getCarPage();
    const currentPage = page ? page : '1';

    const { cars, total } = await API.getCars(getCarsParams(+currentPage, +CarBlockTypes.LimitType));

    this.total = total ? total : this.total;
    this.buildHeader('Garage', this.total, currentPage);

    this.CarsList = new CarsList(TagNames.DIV, CarBlockTypes.CarBlockClass, cars);
    this.container.append(this.CarsList.render());

    const maxPage = Math.ceil(Number(this.total) / Number(CarBlockTypes.LimitType));
    const minPage = 1;

    let isPrevDisabled = page ? +page === minPage : true;
    let isNextDisabled = page ? +page === maxPage : false;

    const prevClick = () => {
      const page = storage.getCarPage();
      if (page && +page === minPage) isPrevDisabled = true;
      if (page && page !== '1') {
        storage.setCarPage((+page - 1).toString());
        this.container.innerHTML = '';
        this.buildCarsList();
      }
    };

    const nextClick = () => {
      const page = storage.getCarPage();
      if (page && +page === maxPage) isNextDisabled = true;
      const condition = page && +page * +CarBlockTypes.LimitType < Number(total);
      if (condition) {
        storage.setCarPage((+page + 1).toString());
        this.container.innerHTML = '';
        this.buildCarsList();
      }
    };

    this.buildPaginationButtons(isPrevDisabled, isNextDisabled, prevClick, nextClick);
  };

  render() {
    this.buildCarsList();
    return this.container;
  }
}
