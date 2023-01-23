export const enum Events {
  storage = 'storage',
  changePage = 'changePage',
  updatePage = 'updatePage',
  startRace = 'startRace',
  resetRace = 'resetRace',
  selectCar = 'selectCar',
  finish = 'finish',
}

export const CreatedEvents = {
  storage: new Event(Events.storage),
  changePage: new Event(Events.changePage),
  updatePage: new Event(Events.updatePage),
  startRace: new Event(Events.startRace),
  resetRace: new Event(Events.resetRace),
  selectCar: new Event(Events.selectCar),
  finish: new Event(Events.finish),
};
