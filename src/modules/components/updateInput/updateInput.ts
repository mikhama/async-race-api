import { CreatedEvents } from '../../events/events';
import { API } from '../../api/api';
import { storage } from '../../storage/storage';
import { InputField } from '../../templates/inputField';

export class UpdateInput extends InputField {
  static TextObject = {
    ButtonContent: 'Update car',
  };
  private id: string = '0';

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.button.innerHTML = UpdateInput.TextObject.ButtonContent;
    this.selectElement();
  }

  selectElement() {
    addEventListener('storage', async () => {
      const id = storage.getSelectedCar();
      if (id !== '0') {
        this.id = id;
        const car = await API.getCar(+id);
        this.input.value = car.name;
        this.colorInput.value = car.color;
      }
      console.log(this.id);
    });
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);
    this.button.addEventListener('click', async () => {
      const carName = this.input.value;
      const carColor = this.colorInput.value;
      const car = { name: carName, color: carColor };
      await API.updateCar(+this.id, car);
      storage.setDefaultSelectedCar();

      this.input.value = '';
      this.colorInput.value = '#000000';

      window.dispatchEvent(CreatedEvents.updatePage);
    });
    return this.container;
  }
}
