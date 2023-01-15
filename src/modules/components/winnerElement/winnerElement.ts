import { Component } from '../../templates/components';
import { carTag } from '../../utils/utils';
import './winnerElement.css';

export const enum WinnerElementTypes {
  winnerElementClass = 'winner-element',
  winnerImageClass = 'winner-element__image',
}

export class WinnerElement extends Component {
  private id: number;
  private time: number;
  private wins: number;
  private name: string;
  private color: string;

  constructor(tagName: string, className: string, time: number, wins: number, name: string, color: string, id: number) {
    super(tagName, className);
    this.time = time;
    this.wins = wins;
    this.name = name;
    this.color = color;
    this.id = id;
  }

  private buildWinnerElement() {
    const number = document.createElement('span');
    number.innerHTML = `${this.id}`;

    const image = document.createElement('span');
    image.innerHTML = carTag;
    const g = image.getElementsByTagName('g')[0];
    g.style.fill = this.color;
    image.classList.add(WinnerElementTypes.winnerImageClass);

    const name = document.createElement('span');
    name.innerHTML = `${this.name}`;

    const wins = document.createElement('span');
    wins.innerHTML = `${this.wins}`;

    const time = document.createElement('span');
    time.innerHTML = `${this.time}`;

    this.container.append(number);
    this.container.append(image);
    this.container.append(name);
    this.container.append(wins);
    this.container.append(time);
    // this.container.innerHTML = `Winner: ${this.time} [${this.wins}]`;
  }

  render() {
    this.buildWinnerElement();
    return this.container;
  }
}
