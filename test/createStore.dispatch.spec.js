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
  
  it('should not change store when action is undefined', () => {
    const before = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    store.dispatch(undefined);
    const after = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    expect(true).to.be.equal(before === after);
  });
  
  it('should dispatch functions', () => {
    const before = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    store.dispatch(() => 22);
    const after = store.getState();
    expect(store.getState().counter).to.be.equal(0);
    expect(true).to.be.equal(before === after);
  });
  
  it('should update store when multiple reducers are dispatched', () => {
    const before = store.getState();
    expect(before.counter).to.be.equal(0);
    expect(before.list).to.have.ordered.members([]);
    store.dispatch({
      type: "INC"
    });
    store.dispatch({
      type: "ADD_USER",
      user:"john"
    });
    const after = store.getState();
    expect(after.counter).to.be.equal(1);
    expect(after.list).to.have.ordered.members(["john"]);
    expect(true).to.be.equal(before !== after);
  });
  
  it('should update only update their slice of store when reducers are dispatched', () => {
    const before = store.getState();
    expect(before.counter).to.be.equal(0);
    expect(before.list).to.have.ordered.members([]);
    store.dispatch({
      type: "INC",
      user:"john"
    });
    const after = store.getState();
    expect(after.counter).to.be.equal(1);
    expect(after.list).to.have.ordered.members([]);
    expect(true).to.be.equal(before !== after);
  });
  
  it('throw error when reducers dont specify an intial value', () => {
    
  expect(()=> createStore({
    counter: (state, action)=> state
  })).to.throw(TypeError);
  });
  
 
});
