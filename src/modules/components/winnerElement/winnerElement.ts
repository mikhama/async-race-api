import { Component } from '../../templates/components';

export class WinnerElement extends Component {
  private time: number;
  private wins: number;

  constructor(tagName: string, className: string, time: number, wins: number) {
    super(tagName, className);
    this.time = time;
    this.wins = wins;
  }

  private buildWinnerElement() {
    this.container.innerHTML = `Winner: ${this.time} [${this.wins}]`;
  }

  render() {
    this.buildWinnerElement();
    return this.container;
  }
}
