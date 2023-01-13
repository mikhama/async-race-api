// import { Car } from 'types/types';

class LocalStorage {
  private initialPage = '1';
  private Keys = {
    Car: 'cars',
    Page: 'page',
  };

  constructor() {
    if (!localStorage.getItem(this.Keys.Page)) localStorage.setItem(this.Keys.Page, this.initialPage);
  }
  // static getCars() {
  //   return JSON.parse(localStorage.getItem(Storage.Keys.Car) as string) as Car;
  // }

  // static setCar(value: Car) {
  //   const string = JSON.stringify(value);
  //   localStorage.setItem(Storage.Keys.Car, string);
  // }

  // static removeCars() {
  //   localStorage.removeItem(Storage.Keys.Car);
  // }

  getPage() {
    return localStorage.getItem(this.Keys.Page);
  }

  setPage(page: string) {
    return localStorage.setItem(this.Keys.Page, page);
  }

  clear() {
    localStorage.clear();
  }
}

export const storage = new LocalStorage();
