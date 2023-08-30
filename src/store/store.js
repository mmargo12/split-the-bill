import { createStore } from "vuex";

export default createStore({
  strict: true,
  state() {
    return {
      guests: [],
      food: [],
      checkboxNames: [],
      result: [],
      idForGuests: 0,
      idForFood: 0,
      idForResult: 0
    };
  },
  getters: {
    hasGuests(state) {
      return state.guests.length !== 0
    },
    hasFood(state) {
      return state.food.length !== 0
    },
    hasAllInfo(state) {
      return (state.guests.length !==0 && state.food.length !== 0)
    },
    isGuestsEmpty(state) {
      for (let i = 0; i < state.guests.length; i++) {
        if (Object.values(state.guests[i]).includes("") || Object.values(state.guests[i]).includes(null)) {
          return true
        }
      }
      return false
    },
    isFoodEmpty(state) {
      for (let i = 0; i < state.food.length; i++) {
        if (Object.values(state.food[i]).includes("") || Object.values(state.food[i]).includes(null) || state.food[i].eating.length === 0) {
          return true
        }
      }
      return false
    }
  },
  mutations: {
    ADD_GUEST(state) {
      state.guests.push({
        id: state.idForGuests++,
        name: ''
      });
    },
    DELETE_GUEST(state, id) {
      state.guests.splice(id, 1);
    },
    ADD_FOOD(state) {
      state.food.push({
        id: state.idForFood++,
        title: "",
        price: null,
        paying: "",
        eating: [],
      });
    },
    DELETE_FOOD(state, id) {
      state.food.splice(id, 1);
    },
    ADD_CHECKBOX_NAMES(state) {
      state.checkboxNames.push("");
    },
    CALC_RESULT(state) {
      state.result = []
      for (let i = 0; i < state.food.length; i++) {
        let priceForPerson = state.food[i].price / state.food[i].eating.length;
        priceForPerson = parseFloat(priceForPerson.toFixed(2))
        for (let j = 0; j < state.food[i].eating.length; j++) {
          let guestsName = state.food[i].eating[j];
          let payingName = state.food[i].paying;
          if (guestsName !== payingName) {
            if (state.result.length === 0) {
              state.result.push({
                id: state.idForResult++,
                name: guestsName,
                money: parseFloat(priceForPerson.toFixed(2)),
                whom: state.food[i].paying,
              });
            } else {
              const indexOfName = state.result.findIndex((e) => e.name === guestsName);
              if (indexOfName > -1) {
                if (state.result.some((e) => e.whom === payingName)) {
                  state.result[indexOfName].money += parseFloat(priceForPerson.toFixed(2));
                  state.result[indexOfName].money = parseFloat(state.result[indexOfName].money.toFixed(2))
                } else {
                  state.result.push({
                    id: state.idForResult++,
                    name: guestsName,
                    money: parseFloat(priceForPerson.toFixed(2)),
                    whom: state.food[i].paying,
                  });
                }
              } else {
                state.result.push({
                  id: state.idForResult++,
                  name: guestsName,
                  money: parseFloat(priceForPerson.toFixed(2)),
                  whom: state.food[i].paying,
                });
              }
            }
          }
        }
      }
    },
    UPDATE_GUEST_NAME(state, {value, index}) {
      state.guests[index].name = value;
    },
    UPDATE_FOOD_TITLE(state, {value, index}) {
      state.food[index].title = value
    },
    UPDATE_FOOD_PRICE(state, {value, index}) {
      state.food[index].price = value
    },
    UPDATE_FOOD_PAYING(state, {value, index})
    {
      state.food[index].paying = value
    },
    RESET_FOOD_EATING(state, index) {
      state.food[index].eating.length = 0
    },
    PUSH_EATING_NAME(state, {value, index}) {
      state.food[index].eating.push(value)
    }
  },
  actions: {
    addGuest(store, name) {
      store.commit("ADD_GUEST", name);
    },
    deleteGuest(store, id) {
      store.commit("DELETE_GUEST", id);
    },
    addFood(store, name) {
      store.commit("ADD_FOOD", name);
    },
    deleteFood(store, id) {
      store.commit("DELETE_FOOD", id);
    },
    calcResult(store) {
      store.commit("CALC_RESULT");
    },
    updateGuestName(store, {value, index}) {
      store.commit("UPDATE_GUEST_NAME", {value, index})
    },
    updateFoodTitle(store, {value, index}) {
      store.commit("UPDATE_FOOD_TITLE", {value, index})
    },
    updateFoodPrice(store, {value, index}) {
      store.commit("UPDATE_FOOD_PRICE", {value, index})
    },
    updateFoodPaying(store, {value, index}) {
      store.commit("UPDATE_FOOD_PAYING", {value, index})
    },
    resetFoodEating(store, index) {
      store.commit("RESET_FOOD_EATING", index)
    },
    pushEatingName(store, {value, index}) {
      store.commit("PUSH_EATING_NAME", {value, index})
    }
  },
});