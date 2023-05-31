function makeState<S>() {
  let state: S;
  function getState() {
    return state;
  }
  function setState(x: S) {
    state = x;
  }
  return { getState, setState };
}

export default makeState;