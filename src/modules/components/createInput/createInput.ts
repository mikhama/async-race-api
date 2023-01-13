import { InputField } from '../../templates/inputField';

export class CreateInput extends InputField {
  static TextObject = {
    ButtonContent: 'Create car',
  };

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.button.textContent = CreateInput.TextObject.ButtonContent;
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
      cars.push(car);
      localStorage.setItem('cars', JSON.stringify(cars));
    });
    return this.container;
  }
}
