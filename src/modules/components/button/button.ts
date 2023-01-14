import { Component } from '../../templates/components';

export class Button extends Component {
  constructor(tagName: string, className: string, text: string, isDisabled: boolean = false) {
    super(tagName, className);
    this.container.innerText = text;
    this.container.classList.add('button');
    if (isDisabled) {
      (<HTMLButtonElement>this.container).disabled = true;
    }
  }

  onClick(callback: () => void) {
    this.container.addEventListener('click', callback);
  }

  render() {
    return this.container;
  }
}
