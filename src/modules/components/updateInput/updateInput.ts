import { InputField } from "../../templates/inputField";

export class UpdateInput extends InputField {
  static TextObject = {
    ButtonContent: 'Update car',
  };

  private id: number;

  constructor(tagName: string, className: string, id: number) {
    super(tagName, className);
    this.button.innerHTML = UpdateInput.TextObject.ButtonContent;
    this.id = id;
  }

  render() {
    this.container.append(this.input);
    this.container.append(this.colorInput);
    this.container.append(this.button);
    this.button.addEventListener('click', () => {
      const carName = this.input.value;
      const carColor = this.colorInput.value;
      const car = { name: carName, color: carColor };
      const cars = JSON.parse(localStorage.getItem('cars') || '[]');
      cars[this.id] = car;
      localStorage.setItem('cars', JSON.stringify(cars));
    });
    return this.container;
  }
}