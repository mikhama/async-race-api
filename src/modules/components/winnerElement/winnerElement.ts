import { Component } from '../../templates/components';
import { carTag, TagNames } from '../../utils/constants';
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
    const number = document.createElement(TagNames.SPAN);
    number.innerHTML = `${this.id}`;

    const image = document.createElement(TagNames.SPAN);
    image.innerHTML = carTag;
    const g = image.getElementsByTagName(TagNames.G)[0];
    g.style.fill = this.color;
    image.classList.add(WinnerElementTypes.winnerImageClass);

    const name = document.createElement(TagNames.SPAN);
    name.innerHTML = `${this.name}`;

    const wins = document.createElement(TagNames.SPAN);
    wins.innerHTML = `${this.wins}`;

    const time = document.createElement(TagNames.SPAN);
    time.innerHTML = `${this.time}`;

    this.container.append(number);
    this.container.append(name);
    this.container.append(image);
    this.container.append(wins);
    this.container.append(time);
  }

  render() {
    this.buildWinnerElement();
    return this.container;
  }
}
