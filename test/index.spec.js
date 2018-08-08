/* global describe, it, before */
import chai from 'chai';
import createStore from '../src/createStore.js';

chai.expect();

const expect = chai.expect;

const counterReducer = (state = 0, action) => {
  if (action.type === "INC") {
    return state + 1;
  }
  return state;
}

const listReducer = (state = [], action) => {
  if (action.type === "ADD_USER") {
    return [...state, action.user];
  }
  return state;
};

let store;
beforeEach(() => {
  store = createStore({
    counter: counterReducer,
    list: listReducer
  });
})

afterEach(() => {
  store = null;
})

describe("createStore", () => {
  it("should create a store from an object of reducers", () => {
    expect(store).to.be.an('object');
  });

  it("should have proper store props", () => {
    expect(store).to.have.keys('dispatch', 'getState', 'subscribe');
  });

  it("should throw error when plain object is not given", () => {
    let newStore;
    expect(() => newStore = createStore(0)).to.throw(TypeError);
  });
});

describe("createStore#subscribe", () => {
  it("should subscribe listeners with new state", () => {
    let pushOk = [];
    const unSub = store.subscribe((newState) => {
      pushOk.push("ok");
    })
    store.dispatch({
      type: "INC"
    })
    expect(pushOk).to.have.members(["ok"])
  });

  it("should unsubscribe listeners correctly", () => {
    let pushOk = [];
    const unSub = store.subscribe((newState) => {
      pushOk.push("ok");
    })
    store.dispatch({
      type: "INC"
    })
    store.dispatch({
      type: "INC"
    })
    expect(pushOk).to.have.members(["ok", "ok"])
    unSub();
    store.dispatch({
      type: "INC"
    })
    expect(pushOk).to.have.members(["ok", "ok"])

  });
});
describe("createStore with middleware", () => {
  it("should run middleware", () => {

    let actions = 0;

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          actions += 1
          return action;
        }
      }
    }
    store = createStore({
      counter: counterReducer,
      list: listReducer
    }, saveActionNum, saveActionNum);
    store.dispatch({
      type: "INC"
    })
    expect(actions).to.be.equal(2);
  });

  it("should exit middleware chain early when undefined is returned", () => {

    let actions = 0;

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          if (actions === 0) {
            return undefined
          }
          actions += 1
          return action;
        }
      }
    }

    store = createStore({
      counter: counterReducer,
      list: listReducer
    }, saveActionNum, saveActionNum);
    store.dispatch({
      type: "INC"
    })
    expect(actions).to.be.equal(0);
  });

  it("should restart middleware chain when dispatch called from middleware", () => {

    let actions = [];

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          actions.push(action.type);
          if (action.type === "RESTART") {
            dispatch({
              type: "NORMAL"
            })
          }

          return action;
        }
      }
    }

    store = createStore({
      counter: counterReducer,
      list: listReducer
    }, saveActionNum);
    store.dispatch({
      type: "RESTART"
    })
    expect(actions).to.have.ordered.members(["RESTART", "NORMAL"]);
  });

  it("should pass getState properly to middleware", () => {

    let actions = [];

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          actions.push(getState().counter);
          return action;
        }
      }
    }

    store = createStore({
      counter: counterReducer,
      list: listReducer
    }, saveActionNum);
    store.dispatch({
      type: "INC"
    })
    store.dispatch({
      type: "INC"
    })
    store.dispatch({
      type: "INC"
    })
    expect(actions).to.have.ordered.members([0, 1, 2]);
  });
});


describe("createStore#dispatch", () => {
  it("should update state", () => {
    const before = store.getState();
    expect(store.getState().counter).to.be.equal(0)
    store.dispatch({
      type: "INC"
    })
    const after = store.getState();
    expect(store.getState().counter).to.be.equal(1)
    expect(false).to.be.equal(before === after);
  });

  it("should not update state when action is invalid", () => {
    const before = store.getState();
    expect(store.getState().counter).to.be.equal(0)
    store.dispatch({
      type: "DEC"
    })
    const after = store.getState();
    expect(store.getState().counter).to.be.equal(0)
    expect(true).to.be.equal(before === after);
  });
});

