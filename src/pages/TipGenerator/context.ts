import { createContext } from 'react';
import { ActionType, initialState } from './Reducer/tipReducer';
import { InputState } from './components/InputArea';

export const BillContext = createContext<{
  inputState: InputState;
  updateInput: React.Dispatch<ActionType> | null;
}>({
  inputState: initialState,
  updateInput: null,
});
