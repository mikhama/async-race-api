export interface Car {
  id?: number;
  name: string;
  color: string;
}

export interface FinishCar {
  name: string;
  time: number;
}

export interface WinnerCar {
  id?: number;
  wins: number;
  time: number;
}

export interface QueryParams {
  key: string;
  value: string | number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface SwitchEngine {
  success: boolean;
}
