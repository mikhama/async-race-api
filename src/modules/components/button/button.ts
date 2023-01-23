import { Component } from '../../templates/components';
import './button.css';

export class Button extends Component {
  public isDisabled = false;

  constructor(tagName: string, className: string, text: string, isDisabled: boolean = false) {
    super(tagName, className);
    this.container.innerText = text;
    this.container.classList.add('button');
    if (isDisabled) {
      (<HTMLButtonElement>this.container).disabled = true;
      this.isDisabled = true;
    }
  }

  toggleDisabledStatus() {
    (<HTMLButtonElement>this.container).disabled = !(<HTMLButtonElement>this.container).disabled;
    this.isDisabled = !this.isDisabled;
  }

  onClick(callback: () => void) {
    this.container.addEventListener('click', callback);
  }

  render() {
    return this.container;
  }
}
