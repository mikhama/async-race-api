import { Page } from '../../modules/templates/page';

export class WinnersPage extends Page {
  static TextObject = {
    WinnersTitle: 'Winners Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const headerTitle = this.createHeaderTitle(WinnersPage.TextObject.WinnersTitle);
    this.container.appendChild(headerTitle);
    return this.container;
  }
}
