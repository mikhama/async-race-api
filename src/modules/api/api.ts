import { Car, Engine, QueryParams, SwitchEngine, WinnerCar } from 'types/types';
import { getRandomCar } from '../utils/utils';

export class API {
  private static BASE_URL: string = 'http://127.0.0.1:3000';
  private static Methods = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
  };
  private static Urls = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners',
  };
  private static Headers = {
    Total: 'X-Total-Count',
  };

  private static queryParamsStringify(params: QueryParams[] = []) {
    return params ? `?${params.map(({ key, value }) => `${key}=${value}`).join('&')}` : '';
  }

  static getCars = async (queryParams: QueryParams[]) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.garage}${API.queryParamsStringify(queryParams)}`);
    const cars: Car[] = await response.json();
    const total = response.headers.get(API.Headers.Total);

    return { cars, total };
  };

  static getCar = async (id: number) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.garage}/${id}`);
    const car: Car = await response.json();

    return car;
  };

  static createCar = async (car: Car) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.garage}`, {
      method: API.Methods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const newCar: Car = await response.json();

    return newCar;
  };

  static createRandomCars = async (count: number) => {
    for (let i = 0; i < count; i++) {
      const car = getRandomCar();
      await API.createCar(car);
    }
  };

  static updateCar = async (id: number, car: Car) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.garage}/${id}`, {
      method: API.Methods.PATCH,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const updatedCar: Car = await response.json();

    return updatedCar;
  };

  static deleteCar = async (id: number) => {
    await fetch(`${API.BASE_URL}${API.Urls.garage}/${id}`, {
      method: API.Methods.DELETE,
    });
  };

  static deleteAllCars = async () => {
    const { cars } = await API.getCars([]);
    cars.forEach(async ({ id }) => await API.deleteCar(Number(id)));
  };

  static carEngine = async (queryParams: QueryParams[]) => {
    const response = await fetch(`${API.BASE_URL}${this.Urls.engine}${this.queryParamsStringify(queryParams)}`, {
      method: API.Methods.PATCH,
    });
    const engine: Engine = await response.json();
    return engine;
  };

  static switchEngine = async (queryParams: QueryParams[]) => {
    const response = await fetch(`${API.BASE_URL}${this.Urls.engine}${this.queryParamsStringify(queryParams)}`, {
      method: API.Methods.PATCH,
    });
    try {
      const engine: SwitchEngine = await response.json();
      return engine;
    } catch (error) {
      return { success: false };
    }
  };

  static getWinners = async (queryParams: QueryParams[]) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.winners}${API.queryParamsStringify(queryParams)}`);
    const winners: WinnerCar[] = await response.json();
    const total = response.headers.get(API.Headers.Total);

    return { winners, total };
  };

  static getWinner = async (id: number) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.winners}/${id}`);
    const winner: WinnerCar = await response.json();

    return winner;
  }

  static createWinner = async (winner: WinnerCar) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.winners}`, {
      method: API.Methods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
    const newWinner: WinnerCar = await response.json();

    return newWinner;
  }

  static updateWinner = async (id: number, winner: WinnerCar) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.winners}/${id}`, {
      method: API.Methods.PATCH,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
    const updatedWinner: WinnerCar = await response.json();

    return updatedWinner;
  }

  static deleteWinner = async (id: number) => {
    await fetch(`${API.BASE_URL}${API.Urls.winners}/${id}`, {
      method: API.Methods.DELETE,
    });
  }
}
