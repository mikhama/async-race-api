import { CarBlock } from '../../modules/components/carsBlock/carsBlock';
import { infoBar } from '../../modules/components/infoBar/infoBar';
import { Page } from '../../modules/templates/page';

const enum GaragePageTypes {
  InfoBar = 'info-bar',
  CarsBlock = 'cars-block',
}

export class GaragePage extends Page {
  private infoBar: infoBar;
  private CarBlock: CarBlock;

  constructor(id: string) {
    super(id);
    this.infoBar = new infoBar('div', GaragePageTypes.InfoBar);
    this.CarBlock = new CarBlock('div', GaragePageTypes.CarsBlock);
  }

  render() {
    this.container.appendChild(this.infoBar.render());
    this.container.appendChild(this.CarBlock.render());
    return this.container;
  }
}
