import { infoBar } from '../../modules/components/infoBar/infoBar';
import { Page } from '../../modules/templates/page';

export class GaragePage extends Page {
  static TextObject = {
    GarageTitle: 'Garage Page',
  };
  private infoBar: infoBar;

  constructor(id: string) {
    super(id);
    this.infoBar = new infoBar('div', 'info-bar');
  }

  render() {
    const headerTitle = this.createHeaderTitle(GaragePage.TextObject.GarageTitle);
    this.container.appendChild(headerTitle);
    this.container.appendChild(this.infoBar.render());
    return this.container;
  }
}
