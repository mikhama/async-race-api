import { API } from '../../api/api';
import { storage } from '../../storage/storage';
import { Component } from '../../templates/components';
import { Button } from '../button/button';

export const enum CarElementTypes {
  imageUrl = 'https://svgsilh.com/svg/151962.svg',
  buttonRemove = 'button-car-remove',
  buttonSelect = 'button-car-select',
}

export class CarElement extends Component {
  private image: string;
  private name: string;
  private color: string;

  constructor(tagName: string, className: string, name: string, color: string, id: string) {
    super(tagName, className);
    this.name = name;
    this.image = CarElementTypes.imageUrl;
    this.color = color;
    this.container.id = id;
  }

  private buildCarButtons() {
    const remove = new Button('button', CarElementTypes.buttonRemove, 'Remove');
    remove.onClick(() => {
      API.deleteCar(+this.container.id);
      this.container.remove();
    });
    const select = new Button('button', CarElementTypes.buttonSelect, 'Select');
    select.onClick(() => {
      storage.setSelectedCar(this.container.id);
    });

    this.container.append(select.render());
    this.container.append(remove.render());
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
    this.buildCarButtons();
  }

  render() {
    this.buildCarElement();
    return this.container;
  }
}
