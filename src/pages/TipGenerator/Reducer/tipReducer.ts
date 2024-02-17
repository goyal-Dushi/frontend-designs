import { InputState } from '../components/InputArea';

export const initialState: InputState = {
  bill: 0,
  tip: 0,
  person: 0,
};

export type ActionType = {
  type: 'bill' | 'tip' | 'person' | 'reset';
  value: number;
};

export const reducer = (state: InputState, action: ActionType) => {
  switch (action.type) {
    case 'bill':
      return { ...state, bill: action.value };
    case 'tip':
      return { ...state, tip: action.value };
    case 'person':
      return { ...state, person: action.value };
    case 'reset':
      const resetVal = action.value;
      return { bill: resetVal, tip: resetVal, person: resetVal };
    default:
      return { ...state };
  }
};
