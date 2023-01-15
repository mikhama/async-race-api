export const enum Events {
  storage = 'storage',
  updatePage = 'updatePage',
  startRace = 'startRace',
  resetRace = 'resetRace',
  selectCar = 'selectCar',
}

export const CreatedEvents = {
  storage: new Event(Events.storage),
  updatePage: new Event(Events.updatePage),
  startRace: new Event(Events.startRace),
  resetRace: new Event(Events.resetRace),
  selectCar: new Event(Events.selectCar),
};
