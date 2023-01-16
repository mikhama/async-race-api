import { API } from '../../api/api';
import { storage } from '../../storage/storage';
import { InputField } from '../../templates/inputField';
import { Car } from 'types/types';
import { CarElementTypes } from '../carElement/carElement';
import { TagNames } from 'src/modules/utils/constants';

export class UpdateInput extends InputField {
  static textObject = {
    buttonContent: 'UPDATE CAR',
    defaultColor: '#000000',
    defaultValue: '',
    defaultStatus: true,
  };
  private id: number = 0;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.button.innerHTML = UpdateInput.textObject.buttonContent;
    this.button.disabled = true;
    this.selectElement();
  }

  selectElement() {
    addEventListener('storage', async () => {
      const id = +storage.getSelectedCar();
      if (id) {
        this.id = id;
        const car = await API.getCar(id);
        this.input.value = car.name;
        this.colorInput.value = car.color;
        this.button.disabled = false;
      }
    });
  }

  private changeUpdatedCar(car: Car) {
    const carElement = document.querySelector(`[data-id="${this.id}"]`) as HTMLElement;
    const carName = carElement.querySelector(`.${CarElementTypes.carName}`) as HTMLElement;
    const carImage = carElement.querySelector(`.${CarElementTypes.carImage}`)?.getElementsByTagName(TagNames.SVG)[0];

    carName.innerHTML = car.name.trim();
    const g = carImage?.getElementsByTagName(TagNames.G)[0];
    if (g) g.style.fill = car.color;
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);

    this.button.addEventListener('click', async () => {
      const carName = this.input.value;
      const carColor = this.colorInput.value;
      const car = { name: carName.trim(), color: carColor };
      await API.updateCar(+this.id, car);

      this.changeUpdatedCar(car);
      storage.setDefaultSelectedCar();

      const { defaultColor, defaultValue, defaultStatus: defaultStatus } = UpdateInput.textObject;

      this.input.value = defaultValue;
      this.colorInput.value = defaultColor;

      this.button.disabled = defaultStatus;
    });

    return this.container;
  }
}
