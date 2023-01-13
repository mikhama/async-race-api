export const enum Events {
  storage = 'storage',
  updatePage = 'updatePage',
}

export const CreatedEvents = {
  storage: new Event(Events.storage),
  updatePage: new Event(Events.updatePage),
}
