import { API } from 'src/modules/api/api';
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
    const button = new Button('button', 'button', 'Create 100 random cars');
    button.onClick(async () => {
      const carsAmount = 100;
      await API.createRandomCars(carsAmount);
    });
  }

  render() {
    this.container.append(this.createInput.render());
    this.container.append(this.updateInput.render());
    return this.container;
  }
}
