import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, dispatchTo, getFrom} from './index';
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
