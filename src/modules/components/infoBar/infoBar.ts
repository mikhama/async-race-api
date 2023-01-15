import { CreatedEvents } from '../../events/events';
import { API } from '../../api/api';
import { Component } from '../../templates/components';
import { Button } from '../button/button';
import { CreateInput } from '../createInput/createInput';
import { UpdateInput } from '../updateInput/updateInput';
import { storage } from '../../storage/storage';

export const enum InformationTypes {
  updateType = 'update-input',
  createType = 'create-input',
  generateCars = 'button-generate-cars',
  clearCars = 'button-clear-cars',
  raceCars = 'button-race',
  resetCars = 'button-reset',
}

export class infoBar extends Component {
  private updateInput: UpdateInput;
  private createInput: CreateInput;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.updateInput = new UpdateInput('div', InformationTypes.updateType);
    this.createInput = new CreateInput('div', InformationTypes.createType);
  }

  createButtons() {
    const race = new Button('button', InformationTypes.raceCars, 'RACE');
    race.onClick(() => {
      window.dispatchEvent(CreatedEvents.startRace);
      storage.setRaceCars();
    });

    const removeRase = new Button('button', InformationTypes.resetCars, 'RESET');
    removeRase.onClick(() => {
      window.dispatchEvent(CreatedEvents.resetRace);
    });

    const generateCars = new Button('button', InformationTypes.generateCars, 'GENERATE CARS');
    generateCars.onClick(async () => {
      const carsAmount = 100;
      await API.createRandomCars(carsAmount);
      window.dispatchEvent(CreatedEvents.updatePage);
    });

    const clear = new Button('button', InformationTypes.clearCars, 'CLEAR');
    clear.onClick(async () => {
      await API.deleteAllCars();
      await API.getCars([]);

      window.dispatchEvent(CreatedEvents.updatePage);
      storage.setDefaultCarPage();
    });

    this.container.append(race.render());
    this.container.append(removeRase.render());
    this.container.append(generateCars.render());
    this.container.append(clear.render());
  }

  render() {
    this.container.append(this.createInput.render());
    this.container.append(this.updateInput.render());
    this.createButtons();
    return this.container;
  }
}
