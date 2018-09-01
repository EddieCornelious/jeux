/* global describe, it, before */
import chai from 'chai';
import createStore from '../src/createStore.js';
import {counterReducer, listReducer} from './testData.js';

chai.expect();

const expect = chai.expect;

let store;
beforeEach(() => {
  store = createStore({
    counter: counterReducer,
    list: listReducer
  });
});

afterEach(() => {
  store = null;
});

describe('createStore', () => {
  it('should create a store from an object of reducers', () => {
    expect(store).to.be.an('object');
  });

  it('should have proper store props', () => {
    expect(store).to.have.keys('dispatch', 'getState', 'subscribe');
  });

  it('each prop should be a function', () => {
    expect(store.dispatch).to.be.a('function');
    expect(store.getState).to.be.a('function');
    expect(store.subscribe).to.be.a('function');
  });

  it('should throw error when plain object is not given', () => {
    expect(() => createStore(0)).to.throw(TypeError);
  });

  it('should throw error when reducer keys dont map to funcs', () => {
    expect(() => createStore({name: 0}).dispatch()).to.throw(TypeError);
  });
});

describe('createStore with middleware', () => {
  it('should run middleware', () => {
    let actions = 0;

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          actions += 1;
          return action;
        };
      };
    }
    store = createStore(
      {
        counter: counterReducer,
        list: listReducer
      },
      saveActionNum,
      saveActionNum
    );
    store.dispatch({
      type: 'INC'
    });
    expect(actions).to.be.equal(2);
  });

  it('should exit middleware chain early when undefined is returned', () => {
    let actions = 0;

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          if (actions === 0) {
            return undefined;
          }
          actions += 1;
          return action;
        };
      };
    }

    store = createStore(
      {
        counter: counterReducer,
        list: listReducer
      },
      saveActionNum,
      saveActionNum
    );
    store.dispatch({
      type: 'INC'
    });
    expect(actions).to.be.equal(0);
  });

  it('should restart middleware chain when dispatch called from middleware', () => {
    let actions = [];

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          actions.push(action.type);
          if (action.type === 'RESTART') {
            dispatch({
              type: 'NORMAL'
            });
          } else if (action.type === 'NORMAL') {
            store.dispatch({
              type: 'JUICE'
            });
          }

          return action;
        };
      };
    }

    store = createStore(
      {
        counter: counterReducer,
        list: listReducer
      },
      saveActionNum
    );
    store.dispatch({
      type: 'RESTART'
    });

    expect(actions).to.have.ordered.members(['RESTART', 'NORMAL', 'JUICE']);
  });

  it('should pass getState properly to middleware', () => {
    let actions = [];

    function saveActionNum(dispatch) {
      return function(getState) {
        return function(action) {
          actions.push(getState().counter);
          return action;
        };
      };
    }

    store = createStore(
      {
        counter: counterReducer,
        list: listReducer
      },
      saveActionNum
    );
    store.dispatch({
      type: 'INC'
    });
    store.dispatch({
      type: 'INC'
    });
    store.dispatch({
      type: 'INC'
    });
    expect(actions).to.have.ordered.members([0, 1, 2]);
  });
});
