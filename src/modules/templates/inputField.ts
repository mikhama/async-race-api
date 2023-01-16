import { Button } from '../components/button/button';
import { TagNames } from '../utils/constants';
import { Component } from './components';

export const enum InputFieldTypes {
  inputField = 'input-field',
  inputFieldButton = 'input-field-button',
}

export class InputField extends Component {
  private textObject = {
    typeText: 'text',
    typeColor: 'color',
    placeholder: 'Enter car name',
  };
  protected input: HTMLInputElement;
  protected colorInput: HTMLInputElement;
  protected button: HTMLButtonElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);

    this.container.classList.add(InputFieldTypes.inputField);

    this.input = document.createElement(TagNames.INPUT);
    this.input.type = this.textObject.typeText;
    this.input.placeholder = this.textObject.placeholder;

    this.colorInput = document.createElement(TagNames.INPUT);
    this.colorInput.type = this.textObject.typeColor;

    this.button = new Button(
      TagNames.BUTTON,
      InputFieldTypes.inputFieldButton,
      TagNames.BUTTON
    ).render() as HTMLButtonElement;
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);
    return this.container;
  }
}
