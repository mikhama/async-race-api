import { ModalWindow } from '../../modules/components/modalWindow/modalWindow';
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
  private modalWindow: ModalWindow;

  constructor(id: string) {
    super(id);
    this.infoBar = new infoBar('div', GaragePageTypes.InfoBar);
    this.CarBlock = new CarBlock('div', GaragePageTypes.CarsBlock);
    this.modalWindow = new ModalWindow('div', 'modal-window');
  }

  render() {
    this.container.appendChild(this.modalWindow.render());
    this.container.appendChild(this.infoBar.render());
    this.container.appendChild(this.CarBlock.render());
    return this.container;
  }
}
