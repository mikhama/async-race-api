import { TagNames } from '../utils/constants';

export abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement(TagNames.DIV);
    this.container.id = id;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement(TagNames.H1);
    headerTitle.innerText = text;
    return headerTitle;
  }

  render() {
    return this.container;
  }
}
