import { CreatedEvents, Events } from '../../events/events';
import { API } from '../../api/api';
import { storage } from '../../storage/storage';
import { Component } from '../../templates/components';
import { Button } from '../button/button';
import { carTag } from '../../utils/utils';
import './carElement.css';

export const enum CarElementTypes {
  buttonRemove = 'button-car-remove',
  buttonSelect = 'button-car-select',
  carImage = 'car-image',
  carHeader = 'car-header',
  carFooter = 'car-footer',
  startButton = 'button-car-start',
  stopButton = 'button-car-stop',
  // hiddenButton = 'button-hidden',
}

export class CarElement extends Component {
  private name: string;
  private color: string;
  private stopButton: Button;
  private startButton: Button;
  private defaultPosition: number = 0;
  private image: HTMLDivElement | null = null;
  private animationId: number = 0;

  constructor(tagName: string, className: string, name: string, color: string, id: string) {
    super(tagName, className);
    this.name = name;
    this.color = color;
    this.container.id = id;
    this.startButton = new Button('button', CarElementTypes.startButton, 'A');
    this.stopButton = new Button('button', CarElementTypes.stopButton, 'B', true);
  }

  private carAnimation = async (duration: number) => {
    const image = this.image;
    const imageOffsetWidth = image ? image.offsetWidth : 0;
    const prevSibling = image?.previousElementSibling as HTMLDivElement;
    const fullRoad = window.innerWidth - 2 * prevSibling.offsetWidth - imageOffsetWidth;
    const start = performance.now();
    const timer = Date.now();

    const animate = (time: number) => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timeFraction * fullRoad;
      if (image) {
        image.style.marginLeft = progress + 'px';
      }

      if (timeFraction < 1) {
        this.animationId = window.requestAnimationFrame(animate);
      } else {
        const time = (Date.now() - timer) / 1000;
        this.checkWinner(time);
      }
    };

    this.animationId = window.requestAnimationFrame(animate);
  };

  private checkWinner = async (time: number) => {
    if (typeof storage.getRaceCars() !== 'string') return;

    storage.setRaceCars({ name: this.name, time });
    window.dispatchEvent(CreatedEvents.storage);
    const winner = await API.getWinner(+this.container.id);

    if (winner && winner.wins) {
      await API.updateWinner(+this.container.id, { wins: winner.wins + 1, time });
    } else {
      await API.createWinner({ wins: 1, time });
    }
  };

  private buildCarButtons() {
    const remove = new Button('button', CarElementTypes.buttonRemove, 'REMOVE');
    remove.onClick(() => {
      API.deleteCar(+this.container.id);
      window.dispatchEvent(CreatedEvents.updatePage);
    });

    const select = new Button('button', CarElementTypes.buttonSelect, 'SELECT');
    select.onClick(() => {
      storage.setSelectedCar(this.container.id);
      window.dispatchEvent(CreatedEvents.selectCar);
    });

    const header = document.createElement('div');
    header.classList.add(CarElementTypes.carHeader);
    header.append(select.render());
    header.append(remove.render());
    return header;
  }

  private changeButtonsStatus() {
    this.startButton.toggleDisabledStatus();
    this.stopButton.toggleDisabledStatus();
  }

  private buildCarImage() {
    const carImage = document.createElement('div');
    carImage.classList.add(CarElementTypes.carImage);
    carImage.innerHTML = carTag;
    const g = carImage.getElementsByTagName('g')[0];
    g.style.fill = this.color;
    return carImage;
  }

  private buildCarName = () => {
    const carName = document.createElement('p');
    carName.innerText = this.name;
    return carName;
  };

  private buildCartDriveButtons() {
    this.startButton.onClick(async () => {
      this.changeButtonsStatus();
      const { velocity, distance } = await API.carEngine([
        { key: 'id', value: this.container.id },
        { key: 'status', value: 'started' },
      ]);
      const time = distance / velocity;
      this.carAnimation(time);

      const { success } = await API.switchEngine([
        { key: 'id', value: this.container.id },
        { key: 'status', value: 'drive' },
      ]);

      if (!success) window.cancelAnimationFrame(this.animationId);
    });

    this.stopButton.onClick(() => {
      this.changeButtonsStatus();
      API.carEngine([
        { key: 'id', value: this.container.id },
        { key: 'status', value: 'stopped' },
      ]);

      window.cancelAnimationFrame(this.animationId);
      if (this.image) this.image.style.marginLeft = this.defaultPosition + 'px';
    });

    const stopHTML = this.stopButton.render();
    const driveHTML = this.startButton.render();

    addEventListener(Events.startRace, () => {
      driveHTML.click();
    });

    addEventListener(Events.resetRace, () => {
      stopHTML.click();
    });

    const buttons = document.createElement('div');
    buttons.append(driveHTML);
    buttons.append(stopHTML);
    return buttons;
  }

  private buildCarFooter() {
    const carFooter = document.createElement('div');
    carFooter.classList.add(CarElementTypes.carFooter);
    const carImage = this.buildCarImage();
    this.image = carImage;
    const driveButtons = this.buildCartDriveButtons();

    carFooter.append(driveButtons);
    carFooter.append(carImage);
    return carFooter;
  }

  private buildCarElement() {
    const carName = this.buildCarName();
    const header = this.buildCarButtons();
    const footer = this.buildCarFooter();

    header.append(carName);
    this.container.append(header);
    this.container.append(footer);
  }

  render() {
    this.buildCarElement();
    return this.container;
  }
}
