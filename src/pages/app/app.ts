import { GaragePage } from '../garage/garage';
import { WinnersPage } from '../winners/winners';
import { NotFoundPage, ErrorTypes } from '../notFound/notFound';
import { Header } from '../../modules/components/header/header';
import './app.css';
import { TagNames } from 'src/modules/utils/constants';

export const enum PageTypes {
  garagePage = 'garage-page',
  winnersPage = 'winners-page',
  header = 'header-page',
}

export class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'garage-page';
  private header: Header;

  private static garagePage: HTMLElement;
  private static notFoundPage: HTMLElement;

  constructor() {
    this.header = new Header(TagNames.HEADER, PageTypes.header);
    App.garagePage = new GaragePage(PageTypes.garagePage).render();
    App.notFoundPage = new NotFoundPage(PageTypes.winnersPage, ErrorTypes.Error404).render();
  }

  static renderNewPage(idPage: string) {
    const oldPage = document.getElementById(App.defaultPageId) as HTMLElement;
    if (oldPage) oldPage.remove();

    idPage = idPage || App.defaultPageId;

    let page: HTMLElement | null = null;

    if (idPage === PageTypes.garagePage) {
      page = App.garagePage;
    } else if (idPage === PageTypes.winnersPage) {
      page = new WinnersPage(PageTypes.winnersPage).render();
    } else {
      page = App.notFoundPage;
    }

    if (page) {
      const pageHTML = page;
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
