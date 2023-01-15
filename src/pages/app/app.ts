import { Page } from '../../modules/templates/page';
import { GaragePage } from '../garage/garage';
import { WinnersPage } from '../winners/winners';
import { NotFoundPage, ErrorTypes } from '../notFound/notFound';
import { Header } from '../../modules/components/header/header';

export const enum PageIds {
  GaragePage = 'garage-page',
  WinnersPage = 'winners-page',
}

export class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'garage-page';
  private header: Header;

  constructor() {
    this.header = new Header('header', 'header');
  }

  static renderNewPage(idPage: string) {
    const oldPage = document.getElementById(App.defaultPageId) as HTMLElement;
    if (oldPage) oldPage.remove();

    idPage = idPage || App.defaultPageId;

    let page: Page | null = null;

    if (idPage === PageIds.GaragePage) {
      page = new GaragePage(idPage) || null;
    } else if (idPage === PageIds.WinnersPage) {
      page = new WinnersPage(idPage);
    } else {
      page = new NotFoundPage(idPage, ErrorTypes.Error404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.appendChild(pageHTML);
    }
  }

  private getHashId = () => window.location.hash.slice(1);

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const idPage = this.getHashId();
      App.renderNewPage(idPage);
    });
  }

  run() {
    App.renderNewPage(this.getHashId());
    App.container.prepend(this.header.render());
    this.enableRouteChange();
  }
}
