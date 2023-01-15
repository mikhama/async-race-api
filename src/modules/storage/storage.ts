// import { Car } from 'types/types';
import { FinishCar } from 'types/types';
import { CreatedEvents } from '../events/events';

class LocalStorage {
  private Initial = {
    page: '1',
    selectedCar: '0',
    race: 'start',
  };

  private Keys = {
    cars: 'cars',
    race: 'race',
    page: 'page',
    selectedCar: 'selectedCar',
  };

  constructor() {
    if (!localStorage.getItem(this.Keys.page)) localStorage.setItem(this.Keys.page, this.Initial.page);
    localStorage.setItem(this.Keys.selectedCar, this.Initial.selectedCar);
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

  setRaceCars(data: string | FinishCar = this.Initial.race) {
    localStorage.setItem(this.Keys.race, JSON.stringify(data));
    // window.dispatchEvent(CreatedEvents.storage);
  }

  setDefaultRaceCars() {
    localStorage.setItem(this.Keys.race, this.Initial.race);
  }

  getRaceCars() {
    return JSON.parse(localStorage.getItem(this.Keys.race) as string) as string | FinishCar;
  }

  getSelectedCar() {
    return JSON.parse(localStorage.getItem(this.Keys.selectedCar) as string) as string;
  }

  setSelectedCar(id: string) {
    localStorage.setItem(this.Keys.selectedCar, id);
    window.dispatchEvent(CreatedEvents.storage);
  }

  setDefaultSelectedCar() {
    localStorage.setItem(this.Keys.selectedCar, this.Initial.selectedCar);
  }

  getPage() {
    return localStorage.getItem(this.Keys.page);
  }

  setPage(page: string) {
    return localStorage.setItem(this.Keys.page, page);
  }

  setDefaultPage() {
    localStorage.setItem(this.Keys.page, this.Initial.page);
  }

  clear() {
    localStorage.clear();
  }
}

export const storage = new LocalStorage();
