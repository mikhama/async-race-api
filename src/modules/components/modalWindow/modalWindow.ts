import { Events } from '../../events/events';
import { FinishCar } from 'types/types';
import { storage } from '../../storage/storage';
import { Component } from '../../templates/components';
import './modalWindow.css';

export const enum ModalWindowTypes {
  modalWindowShow = 'modal-window-show',
}

export class ModalWindow extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);

    addEventListener(Events.finish, () => {
      const car = storage.getRaceCars();
      if (typeof car === 'string') return;
      this.setWindow(car);
    });
  }

  private setWindow(car: FinishCar) {
    this.container.innerHTML = `The ${car.name} is winner! [${car.time}s]`;

    this.container.classList.add(ModalWindowTypes.modalWindowShow);
    setTimeout(() => {
      this.container.classList.remove(ModalWindowTypes.modalWindowShow);
    }, 3000);
  }

  render() {
    return this.container;
  }
}
