import { CreatedEvents } from '../../events/events';
import { API } from '../../api/api';
import { Component } from '../../templates/components';
import { Button } from '../button/button';
import { CreateInput } from '../createInput/createInput';
import { UpdateInput } from '../updateInput/updateInput';
import { storage } from '../../storage/storage';
import { CarsListTypes } from '../carsList/carsList';
import { CarElementTypes } from '../carElement/carElement';
import './infoBar.css';
import { TagNames } from 'src/modules/utils/constants';

export const enum InformationTypes {
  updateType = 'update-input',
  createType = 'create-input',
  buttonsContainer = 'buttons-container',
  generateCars = 'button-generate-cars',
  clearCars = 'button-clear-cars',
  raceCars = 'button-race',
  resetCars = 'button-reset',
}

export class infoBar extends Component {
  private updateInput: UpdateInput;
  private createInput: CreateInput;

  private buttonNames = {
    race: 'RACE',
    reset: 'RESET',
    generate: 'GENERATE CARS',
  };

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.updateInput = new UpdateInput(TagNames.DIV, InformationTypes.updateType);
    this.createInput = new CreateInput(TagNames.DIV, InformationTypes.createType);
  }

  private createRaceButton() {
    const race = new Button(TagNames.BUTTON, InformationTypes.raceCars, this.buttonNames.race);
    race.onClick(() => {
      window.dispatchEvent(CreatedEvents.startRace);

      const cars = document.querySelectorAll(`.${CarsListTypes.CarsListType}`);

      cars.forEach((car) => {
        (<HTMLButtonElement>car.querySelector(`.${CarElementTypes.stopButton}`))?.click();
        (<HTMLButtonElement>car.querySelector(`.${CarElementTypes.startButton}`))?.click();
      });

      storage.setRaceCars();
    });
    return race;
  }

  private createResetButton() {
    const removeRase = new Button(TagNames.BUTTON, InformationTypes.resetCars, this.buttonNames.reset);
    removeRase.onClick(() => {
      window.dispatchEvent(CreatedEvents.resetRace);
    });
    return removeRase;
  }

  private createGenerateButton() {
    const generateCars = new Button(TagNames.BUTTON, InformationTypes.generateCars, this.buttonNames.generate);
    generateCars.onClick(async () => {
      const carsAmount = 100;
      await API.createRandomCars(carsAmount);
      window.dispatchEvent(CreatedEvents.updatePage);
    });
    return generateCars;
  }

  private createButtons() {
    const race = this.createRaceButton();
    const removeRase = this.createResetButton();
    const generateCars = this.createGenerateButton();
    const buttonsContainer = document.createElement(TagNames.DIV);
    buttonsContainer.classList.add(InformationTypes.buttonsContainer);

    buttonsContainer.append(race.render());
    buttonsContainer.append(removeRase.render());
    buttonsContainer.append(generateCars.render());
    this.container.append(buttonsContainer);
  }

  render() {
    this.container.append(this.createInput.render());
    this.container.append(this.updateInput.render());
    this.createButtons();
    return this.container;
  }
}
