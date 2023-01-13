import { Page } from '../../modules/templates/page';

export const enum ErrorTypes {
  Error404 = 404,
}

export class NotFoundPage extends Page {
  private errorType: ErrorTypes | string;
  static TextObject: Record<string, string> = {
    '404': 'The page was not found',
  };
  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle(NotFoundPage.TextObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}
