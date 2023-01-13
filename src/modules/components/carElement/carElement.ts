import { Component } from '../../templates/components';

export class CarElement extends Component {
  private image: string;
  private name: string;
  private color: string;

  constructor(tagName: string, className: string, name: string, color: string) {
    super(tagName, className);
    this.name = name;
    this.image = 'https://webpack.js.org/site-logo.1fcab817090e78435061.svg';
    this.color = color;
  }

  private buildCarElement() {
    const carImage = document.createElement('img');
    carImage.src = this.image;
    carImage.alt = this.name;
    carImage.style.backgroundColor = this.color;

    const carName = document.createElement('p');
    carName.innerText = this.name;

    this.container.append(carImage);
    this.container.append(carName);
  }

  render() {
    this.buildCarElement();
    return this.container;
  }
}
