import { CreatedEvents, Events } from '../../events/events';
import { API } from '../../api/api';
import { storage } from '../../storage/storage';
import { Component } from '../../templates/components';
import { Button } from '../button/button';
import { carTag, TagNames } from '../../utils/constants';
import './carElement.css';
import { getCarEngineStartParams, getCarEngineStopParams, getSwitchEngineParams } from '../../api/queryParams';

export const enum CarElementTypes {
  buttonRemove = 'button-car-remove',
  buttonSelect = 'button-car-select',
  carImage = 'car-image',
  carName = 'car-name',
  carHeader = 'car-header',
  carFooter = 'car-footer',
  startButton = 'button-car-start',
  stopButton = 'button-car-stop',
}

export class CarElement extends Component {
  private id: string;
  private name: string;
  private color: string;
  private stopButton: Button;
  private startButton: Button;
  private defaultPosition: number = 100;
  private image: HTMLDivElement | null = null;
  private animationId: number = 0;

  private buttonsNames = {
    remove: 'REMOVE',
    select: 'SELECT',
    start: 'A',
    stop: 'B',
  };

  constructor(tagName: string, className: string, name: string, color: string, id: string) {
    super(tagName, className);
    this.name = name;
    this.color = color;
    this.id = id;

    this.container.dataset.id = id;
    this.startButton = new Button(TagNames.BUTTON, CarElementTypes.startButton, this.buttonsNames.start);
    this.stopButton = new Button(TagNames.BUTTON, CarElementTypes.stopButton, this.buttonsNames.stop, true);
  }

  private carAnimation = async (duration: number) => {
    const image = this.image;
    const imageOffsetWidth = image ? image.offsetWidth : 0;
    const prevSibling = image?.previousElementSibling as HTMLDivElement;
    const fullRoad = window.innerWidth - 2.5 * prevSibling.offsetWidth - imageOffsetWidth;
    const start = performance.now();
    const timer = Date.now();

    if (image) image.style.left = this.defaultPosition + 'px';

    const animate = (time: number) => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timeFraction * fullRoad;
      if (image) {
        image.style.left = progress + 'px';
      }

      if (timeFraction < 1) {
        this.animationId = window.requestAnimationFrame(animate);
      } else {
        const imageMargin = image?.style.left as string;
        if (imageMargin === fullRoad + 'px') {
          const time = (Date.now() - timer) / 1000;
          this.checkWinner(time);
        }
      }
    };

    this.animationId = window.requestAnimationFrame(animate);
    this.setStartPosition();
  };

  private setStartPosition = () => {
    const returnToStartPosition = () => {
      cancelAnimationFrame(this.animationId);
      const image = this.container.querySelector(`.${CarElementTypes.carImage}`) as HTMLDivElement;
      if (image) image.style.left = 0 + 'px';
    };
    addEventListener(Events.startRace, returnToStartPosition);
    addEventListener(Events.updatePage, returnToStartPosition);
  };

  private checkWinner = async (time: number) => {
    if (typeof storage.getRaceCars() !== 'string') return;

    storage.setRaceCars({ name: this.name, time });
    window.dispatchEvent(CreatedEvents.finish);

    const winner = await API.getWinner(+this.id);
    if (Object.values(winner).length === 0) {
      await API.createWinner({ id: +this.id, wins: 1, time });
      return;
    }

    const winnerTime = winner.time < time ? winner.time : time;
    await API.updateWinner(+this.id, { id: +this.id, wins: winner.wins + 1, time: winnerTime });
  };

  private buildCarButtons() {
    const remove = new Button(TagNames.BUTTON, CarElementTypes.buttonRemove, this.buttonsNames.remove);
    remove.onClick(async () => {
      await API.deleteCar(+this.id);
      const isExistInWinners = await API.getWinner(+this.id);
      if (isExistInWinners) {
        await API.deleteWinner(+this.id);
      }

      window.dispatchEvent(CreatedEvents.updatePage);
    });

    const select = new Button(TagNames.BUTTON, CarElementTypes.buttonSelect, this.buttonsNames.select);
    select.onClick(() => {
      storage.setSelectedCar(this.id);
      window.dispatchEvent(CreatedEvents.selectCar);
    });

    const header = document.createElement(TagNames.DIV);
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
    const carImage = document.createElement(TagNames.DIV);
    if (carImage) carImage.style.marginLeft = this.defaultPosition + 'px';
    carImage.classList.add(CarElementTypes.carImage);
    carImage.innerHTML = carTag;
    const g = carImage.getElementsByTagName(TagNames.G)[0];

    g.style.fill = this.color;
    return carImage;
  }

  private buildCarName = () => {
    const carName = document.createElement(TagNames.P);
    carName.classList.add(CarElementTypes.carName);
    carName.innerText = this.name;
    return carName;
  };

  private buildCarStartButton = () => {
    this.startButton.onClick(async () => {
      this.changeButtonsStatus();
      const { velocity, distance } = await API.carEngine(getCarEngineStartParams(this.id));
      const time = distance / velocity;
      this.carAnimation(time);

      const { success } = await API.switchEngine(getSwitchEngineParams(this.id));

      if (!success) window.cancelAnimationFrame(this.animationId);
    });
  };

  private buildCarStopButton = () => {
    this.stopButton.onClick(async () => {
      this.changeButtonsStatus();
      await API.carEngine(getCarEngineStopParams(this.id));

      window.cancelAnimationFrame(this.animationId);
      const image = this.container.querySelector(`.${CarElementTypes.carImage}`) as HTMLDivElement;
      if (image) image.style.left = 0 + 'px';
    });
  };

  private buildCarDriveButtons() {
    this.buildCarStartButton();
    this.buildCarStopButton();

    const stopHTML = this.stopButton.render();
    const driveHTML = this.startButton.render();

    addEventListener(Events.resetRace, () => {
      stopHTML.click();
    });

    const buttons = document.createElement(TagNames.DIV);
    buttons.append(driveHTML);
    buttons.append(stopHTML);
    return buttons;
  }

  private buildCarFooter() {
    const carFooter = document.createElement(TagNames.DIV);
    carFooter.classList.add(CarElementTypes.carFooter);
    const carImage = this.buildCarImage();
    this.image = carImage;
    const driveButtons = this.buildCarDriveButtons();

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
