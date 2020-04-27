import { createStore as createReduxStore } from "redux";
let pathToStore;
let pathInitState;
export const createStore = initState => {
  pathInitState = initState;
  pathToStore = createReduxStore(reducer);
  return pathToStore;
};
export const setStore = (store, initState) => {
  pathToStore = store;
  pathInitState = initState;
};
export const dispatchTo = (pathToField, data) => {
  pathToStore.dispatch({
    type: pathToField,
    data
  });
};
export const getStore = () => {
  return pathToStore;
};
export const getFrom = path => {
  if (!path) return pathToStore.getState();
  let left = pathToStore.getState();
  const fields = path.split("/");

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (left[field] === undefined) {
      if (i < fields.length - 1) console.warn("getFrom, undefined store path: ", path, ", field: ", field);
      return undefined;
    }

    if (left[field] === null && i === fields.length - 1) {
      return null;
    }

    left = left[field];
  }

  return left;
};

function reducer(state = pathInitState, action) {
  try {
    const newState = { ...state
    };
    let left = newState;
    const fields = action.type.split("/");

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (left[field] === undefined) {
        left[field] = {};
      }

      if (i === fields.length - 1) {
        let {
          data
        } = action;
        if (data === undefined) data = left[field];
        if (Array.isArray(data)) left[field] = [...data];else if (typeof data === "object" && data != null) left[field] = { ...data
        };else left[field] = data;
      } else {
        left[field] = { ...left[field]
        };
        left = left[field];
      }
    }

    return newState;
  } catch (e) {
    console.error("reduce error, action: ", action);
    throw e;
  }
}