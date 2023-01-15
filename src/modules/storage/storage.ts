// import { Car } from 'types/types';
import { FinishCar } from 'types/types';
import { CreatedEvents } from '../events/events';

class LocalStorage {
  private Initial = {
    carPage: '1',
    winnerPage: '1',
    selectedCar: '0',
    race: 'start',
  };

  private Keys = {
    cars: 'cars',
    race: 'race',
    carPage: 'page',
    winnerPage: 'winnerPage',
    selectedCar: 'selectedCar',
  };

  constructor() {
    if (!localStorage.getItem(this.Keys.carPage)) localStorage.setItem(this.Keys.carPage, this.Initial.carPage);
    if (!localStorage.getItem(this.Keys.winnerPage)) localStorage.setItem(this.Keys.winnerPage, this.Initial.winnerPage);
    localStorage.setItem(this.Keys.selectedCar, this.Initial.selectedCar);
  }

  setRaceCars(data: string | FinishCar = this.Initial.race) {
    localStorage.setItem(this.Keys.race, JSON.stringify(data));
  }

  setDefaultRaceCars() {
    localStorage.setItem(this.Keys.race, this.Initial.race);
  }

  getRaceCars() {
    const item = localStorage.getItem(this.Keys.race) as string;
    if (item === this.Initial.race) return item;
    return JSON.parse(item) as string | FinishCar;
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

  getCarPage() {
    return localStorage.getItem(this.Keys.carPage);
  }

  setCarPage(page: string) {
    return localStorage.setItem(this.Keys.carPage, page);
  }

  setDefaultCarPage() {
    localStorage.setItem(this.Keys.carPage, this.Initial.carPage);
  }

  getWinnerPage() {
    return localStorage.getItem(this.Keys.winnerPage);
  }

  setWinnerPage(page: string) {
    return localStorage.setItem(this.Keys.winnerPage, page);
  }

  setDefaultWinnerPage() {
    localStorage.setItem(this.Keys.winnerPage, this.Initial.winnerPage);
  }

  clear() {
    localStorage.clear();
  }
}

export const storage = new LocalStorage();
