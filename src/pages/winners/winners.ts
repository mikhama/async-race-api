import { WinnersBlock } from '../../modules/components/winnersBlock/winnersBlock';
import { Page } from '../../modules/templates/page';

export const enum WinnersPageTypes {
  WinnersBlock = 'winners-block',
}

export class WinnersPage extends Page {
  private WinnersBlock: WinnersBlock;

  constructor(id: string) {
    super(id);
    this.WinnersBlock = new WinnersBlock('div', WinnersPageTypes.WinnersBlock);
  }

  render() {
    this.container.append(this.WinnersBlock.render());
    return this.container;
  }
}
