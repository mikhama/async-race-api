export abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string = 'div', className: string = '') {
    this.container = document.createElement(tagName);
    if (className) this.container.classList.add(className);
  }

  render() {
    return this.container;
  }
}
