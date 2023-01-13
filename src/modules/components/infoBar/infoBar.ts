import { Component } from '../../templates/components';
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
    this.updateInput = new UpdateInput('div', InputTypes.UpdateType, 0);
    this.createInput = new CreateInput('div', InputTypes.CreateType);
  }

  render() {
    this.container.append(this.createInput.render());
    this.container.append(this.updateInput.render());
    return this.container;
  }
}
