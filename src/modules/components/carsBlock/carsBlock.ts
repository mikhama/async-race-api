import { storage } from '../../storage/storage';
import { API } from '../../api/api';
import { CarsList } from '../carsList/carsList';
import { Events } from '../../events/events';
import { ListBlock } from '../../templates/listBlock';

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
    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockClass, []);
    this.total = '0';

    addEventListener(Events.updatePage, () => {
      this.container.innerHTML = '';
      this.buildCarsList();
    });
  }

  private buildCarsList = async () => {
    const page = storage.getCarPage();
    const currentPage = page ? page : '1';

    const { cars, total } = await API.getCars([
      { key: '_page', value: currentPage },
      { key: '_limit', value: CarBlockTypes.LimitType },
    ]);

    this.total = total ? total : this.total;
    this.buildHeader('Garage', this.total, currentPage);

    this.CarsList = new CarsList('div', CarBlockTypes.CarBlockClass, cars);
    this.container.append(this.CarsList.render());

    this.buildPaginationButtons(+CarBlockTypes.LimitType, +this.total, this.buildCarsList);
  };

  render() {
    this.buildCarsList();
    return this.container;
  }
}
