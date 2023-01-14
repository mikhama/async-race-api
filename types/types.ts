export interface Car {
  id?: number;
  name: string;
  color: string;
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
