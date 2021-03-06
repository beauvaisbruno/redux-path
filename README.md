Simplify redux usage. Use a path to get and dispatch values.

Warning : this comes with important drawbacks. Components will be coupled with the shape of the store. You won't be able to add extra reducers.

## Installation

### `yarn add redux-path`

## Usage

~~~~
dispatchTo('foo/sub', value);
getFrom('foo/sub');
~~~~

## Simple Example
~~~~
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, dispatchTo, getFrom} from 'redux-path';
import {Provider, useSelector} from 'react-redux';

const initState = {
  foo: {sub: 1},
};

const Foo = () => {
  const sub = useSelector(state => state.foo.sub);
  return <div>
    <div onClick={() => dispatchTo('foo/sub', sub + 1)}>
      Click to increment
    </div>
    <div onClick={() => dispatchTo('foo', {sub: getFrom('foo/sub') + 1})}>
      Click to increment
    </div>
    foo.sub: <>{sub}</>
  </div>
}

ReactDOM.render(
 <Provider store={createStore(initState)}>
   <Foo/>
 </Provider>,
 document.getElementById('root')
);
~~~~

## Initialisation with middleware and persitor
~~~~
import {createLogger} from 'redux-logger'
import {setStore, reducer} from 'redux-path';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist'

const store = createStore(
  persistReducer({/*...options*/}, (state, action) => {
    return reducer(state, action);
  }),
  applyMiddleware(createLogger({/*...options*/}))
)
let persistor = persistStore(store);
setStore(store,initState);
~~~~
