import { Component } from '../../templates/components';

export class CarElement extends Component {
  private image: string;
  private name: string;
  private color: string;

  constructor(tagName: string, className: string, name: string, color: string) {
    super(tagName, className);
    this.name = name;
    this.image = 'https://svgsilh.com/svg/151962.svg';
    this.color = color;
  }

  private buildCarElement() {
    const carImage = document.createElement('img');
    carImage.src = this.image;
    carImage.alt = this.name;
    carImage.style.backgroundColor = this.color;

    carImage.style.width = '10rem';
    carImage.style.height = '4rem';

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
