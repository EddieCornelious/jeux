/* global describe, it, before */
import chai from 'chai';
import createStore from '../src/createStore.js';
import { counterReducer, listReducer } from './testData.js';

chai.expect();

const expect = chai.expect;

let store;
beforeEach(() => {
  store = createStore({
    counter: counterReducer,
    list: listReducer,
  });
});

afterEach(() => {
  store = null;
});

describe('createStore#dispatch', () => {
  it('should update state', () => {
    const before = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    store.dispatch({
      type: 'INC',
    });
    const after = store.getState();
    expect(store.getState().counter).to.be.equal(1);
    expect(false).to.be.equal(before === after);
  });

  it('should not update state when action is invalid', () => {
    const before = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    store.dispatch({
      type: 'DEC',
    });
    const after = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    expect(true).to.be.equal(before === after);
  });
});
