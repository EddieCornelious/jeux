# API

* createStore(reducerObject, middleware1...middlewarenN);

# 2nd-level API
* dispatch()
* subscribe(callback(newState))
* getState()


## Examples

```javascript
function counter(state = 0, action){
    if(action.type === 'INC'){
        return state + 1;
    } else if(action.type === 'DEC'){
        return state - 1;
    }
    return state;
}

function middlewareExample(dispatch){
    return function(getState){
        return function(action){
            console.log(action.type);
        }
    }
}
const reducerObject = { count: counter };
// normal path   dispath --- run through proper reducer
const store = createStore(reducerObject, middlewareExample);
store.dispatch({type: 'INC'});
// count is 1
function subCallack(newState){
  console.log(newState);   
}
store.subscribe(subCallback);
// everytime the store is dispatched, the newState will be given to the callback and logged

store.getState();
// {count : 1}


```