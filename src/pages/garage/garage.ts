import { Page } from '../../modules/templates/page';

export class GaragePage extends Page {
  static TextObject = {
    GarageTitle: 'Garage Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const headerTitle = this.createHeaderTitle(GaragePage.TextObject.GarageTitle);
    this.container.appendChild(headerTitle);
    return this.container;
  }
}
