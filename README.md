# API

* createStore(reducerObject, middleware1...middlewarenN);

# 2nd-level API
* dispatch(action)
* subscribe(callback(newState))
* getState()

## State

A plain js object that describes the state of your application

## Store

The store is nothing but a js object that gives you access to methods that mutate your app state

## Reducers

Reducers are functions that accept the current slice of the state that the reducer responds to and the current action being dispatched.

## Middleware

Middleware are functions that are called before an action gets to any reducers.

## ReducerObject

A plain js object that is used to map keys to reducer functions. See examples below.

### Normal flow  --- dispatch action --- reducers --- update state
### Flow with middleware  --- dispatch action --- passes action through middleware(s) --- reducers --- update state

## createStore

CreateStore accepts the reducer object as a first arg. And middleware functions as 2...n args

See Examples below for more details.

## dispatch

This method is used to dispatch actions to the reducers which take the action and updates
the state accordingly.

most actions look like this
```javascript
{
    
    type : "FETCH_USER",
    extraField : "someData"
}
```

## subscribe

This method is to be used if you would like to know when changes to the store have occurred. Ths method accepts
a callback function that is invoked when the store changes.

## getState

The methods returns the current state of your application

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