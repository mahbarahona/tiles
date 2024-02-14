interface gameData {}
class Datamanager {
  data = {
    first_time: false,
    current_map: "",
    collectable: [],
    inventory: [],
    map: {
      cities: [],
    },
    preferences: {
      music: true,
    },
  };
  init() {
    this.load();
  }

  load() {
    //
  }
  save() {}
}

const dataManager = new Datamanager();
