import { Button } from '../components/button/button';
import { Component } from './components';

export const enum InputFieldTypes {
  inputField = 'input-field',
  inputFieldButton = 'input-field-button',
}

export class InputField extends Component {
  static TextObject = {};
  protected input: HTMLInputElement;
  protected colorInput: HTMLInputElement;
  protected button: HTMLButtonElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);

    this.container.classList.add(InputFieldTypes.inputField);

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Enter car name';

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';

    // this.button = document.createElement('button');
    this.button = new Button('button', InputFieldTypes.inputFieldButton, 'button').render() as HTMLButtonElement;
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);
    return this.container;
  }
}
