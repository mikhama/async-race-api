import { Component } from '../../templates/components';

export class Button extends Component {
  constructor(tagName: string, className: string, text: string) {
    super(tagName, className);
    this.container.innerText = text;
    this.container.classList.add('button');
  }

  onClick(callback: () => void) {
    this.container.addEventListener('click', callback);
  }

  render() {
    return this.container;
  }
}
