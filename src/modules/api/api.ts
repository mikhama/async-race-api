import { Car, QueryParams } from 'types/types';

export class API {
  private static BASE_URL: string = 'http://127.0.0.1:3000';
  private static Urls = {
    garage: '/garage',
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const newCar: Car = await response.json();

    return newCar;
  };

  static updateCar = async (id: number, car: Car) => {
    const response = await fetch(`${API.BASE_URL}${API.Urls.garage}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const updatedCar: Car = await response.json();

    return updatedCar;
  };
}
