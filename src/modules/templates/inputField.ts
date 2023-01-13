import { Component } from './components';

export class InputField extends Component {
  static TextObject = {};
  protected input: HTMLInputElement;
  protected colorInput: HTMLInputElement;
  protected button: HTMLButtonElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Enter car name';

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';

    this.button = document.createElement('button');
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);
    return this.container;
  }
}
