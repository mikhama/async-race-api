import { CreatedEvents } from '../../events/events';
import { API } from '../../api/api';
import { InputField } from '../../templates/inputField';

export class CreateInput extends InputField {
  static textObject = {
    buttonContent: 'CREATE CAR',
  };

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.button.textContent = CreateInput.textObject.buttonContent;
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);
    this.button.addEventListener('click', () => {
      const carName = this.input.value;
      const carColor = this.colorInput.value;
      const car = { name: carName, color: carColor };
      API.createCar(car);

      this.input.value = '';
      this.colorInput.value = '#000000';

      window.dispatchEvent(CreatedEvents.updatePage);
    });
    return this.container;
  }
}
