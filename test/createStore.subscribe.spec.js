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

describe('createStore#subscribe', () => {
  it('should subscribe listeners with new state', () => {
    let pushOk = [];
    const unSub = store.subscribe(newState => {
      pushOk.push('ok');
    });
    store.dispatch({
      type: 'INC',
    });
    expect(pushOk).to.have.members(['ok']);
  });

  it('should unsubscribe listeners correctly', () => {
    let pushOk = [];
    const unSub = store.subscribe(newState => {
      pushOk.push('ok');
    });
    store.dispatch({
      type: 'INC',
    });
    store.dispatch({
      type: 'INC',
    });
    expect(pushOk).to.have.members(['ok', 'ok']);
    unSub();
    store.dispatch({
      type: 'INC',
    });
    expect(pushOk).to.have.members(['ok', 'ok']);
  });
});
