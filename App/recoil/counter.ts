import {atom, selector} from 'recoil';

const counter = atom({
  key: 'counterState',
  default: 0,
});

const incrementSelector = selector({
  key: 'incrementSelector',
  get: ({get}) => {
    const count = get(counter);
    return count + 1;
  },
});

const CounterState = {
  counter,
  incrementSelector,
};

export default CounterState;
