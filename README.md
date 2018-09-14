# API

* createStore(reducerObject, middleware1...middlewarenN);

# 2nd-level API
* dispatch(action)
* subscribe(callback(newState))
* getState()

## Store

The store is nothing but a js object that holds your application state

## Reducers

Reducers are functions that accept the current slice of the state that the reducer responds to and the current action being dispatched.

## Middleware

Middleware are functions that are called before an action gets to any reducers.

Normal flow  --- dispatch action --- reducers --- updated state
Flow with middleware  --- dispatch action --- passes action through middlewares --- reducers --- updated state

## createStore

CreateStore accepts the reducer object as a first arg. This is a mapping of keys to functions. 

See Examples below for more details.

## dispatch

This method is used to dispatch actions to the store and the store takes the actions runs it through the reducers and updates
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