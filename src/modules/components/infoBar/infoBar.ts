import { CreatedEvents } from '../../events/events';
import { API } from '../../api/api';
import { Component } from '../../templates/components';
import { Button } from '../button/button';
import { CreateInput } from '../createInput/createInput';
import { UpdateInput } from '../updateInput/updateInput';

export const enum InputTypes {
  UpdateType = 'update-input',
  CreateType = 'create-input',
}

export class infoBar extends Component {
  private updateInput: UpdateInput;
  private createInput: CreateInput;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.updateInput = new UpdateInput('div', InputTypes.UpdateType);
    this.createInput = new CreateInput('div', InputTypes.CreateType);
  }

  createButtons() {
    const generateCars = new Button('button', 'button-generate-cars', 'GENERATE CARS');
    generateCars.onClick(async () => {
      const carsAmount = 100;
      await API.createRandomCars(carsAmount);
      window.dispatchEvent(CreatedEvents.updatePage);
    });

    const clear = new Button('button', 'button-clear-cars', 'CLEAR');
    clear.onClick(async () => {
      await API.deleteAllCars();
      window.dispatchEvent(CreatedEvents.updatePage);
    });

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
